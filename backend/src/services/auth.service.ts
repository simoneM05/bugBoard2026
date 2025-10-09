import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY, REFRESH_TOKEN_SECRET } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { UserSafe } from '@interfaces/users.interface';
import { prisma } from '@/utils/prisma';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface DataStoredInToken {
  id: string; // MongoDB usa string
}

@Service()
export class AuthService {
  public users = prisma.user;

  private ACCESS_TOKEN_EXPIRY = '15m';
  private REFRESH_TOKEN_EXPIRY = '7d';

  /**
   * SignUp - Crea un nuovo utente
   */
  public async signup(userData: CreateUserDto): Promise<{ user: UserSafe; tokens: TokenPair }> {
    // 1. Verifica se l'email esiste già
    const existingUser = await this.users.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new HttpException(409, `L'email ${userData.email} è già registrata`);
    }

    // 2. Hash della password
    const hashedPassword = await hash(userData.password, 10);

    // 3. Crea l'utente nel database
    const newUser = await this.users.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: 'user', // Default role
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    // 4. Genera i token
    const tokens = await this.generateTokenPair(newUser.id);

    // 5. Salva il refresh token
    await this.users.update({
      where: { id: newUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: newUser as UserSafe,
      tokens,
    };
  }

  public async login(userData: CreateUserDto): Promise<{ user: UserSafe; tokens: TokenPair }> {
    const findUser = await this.users.findUnique({
      where: { email: userData.email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        refreshToken: true,
      },
    });

    if (!findUser) {
      throw new HttpException(404, 'Email o password errati');
    }

    const isPasswordMatching = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) {
      throw new HttpException(401, 'Email o password errati');
    }

    const tokens = await this.generateTokenPair(findUser.id);

    await this.users.update({
      where: { id: findUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    // Rimuovi password e refreshToken dalla response
    const { password, refreshToken, ...userSafe } = findUser;

    return {
      user: userSafe as UserSafe,
      tokens,
    };
  }

  private async generateTokenPair(userId: string): Promise<TokenPair> {
    const dataStoredInToken: DataStoredInToken = { id: userId };

    const accessToken = sign(dataStoredInToken, SECRET_KEY, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = sign(dataStoredInToken, REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  public async refreshAccessToken(refreshToken: string): Promise<TokenPair> {
    try {
      const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET) as DataStoredInToken;

      const user = await this.users.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          refreshToken: true,
        },
      });

      if (!user) {
        throw new HttpException(401, 'Utente non trovato');
      }

      if (user.refreshToken !== refreshToken) {
        await this.users.update({
          where: { id: user.id },
          data: { refreshToken: null },
        });
        throw new HttpException(403, 'Refresh token non valido. Effettua nuovamente il login');
      }

      const newTokens = await this.generateTokenPair(user.id);

      await this.users.update({
        where: { id: user.id },
        data: { refreshToken: newTokens.refreshToken },
      });

      return newTokens;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(403, 'Refresh token non valido o scaduto');
    }
  }

  public async logout(userId: string): Promise<void> {
    const findUser = await this.users.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      throw new HttpException(404, 'Utente non trovato');
    }

    await this.users.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  public verifyAccessToken(token: string): DataStoredInToken {
    try {
      return verify(token, SECRET_KEY) as DataStoredInToken;
    } catch (error) {
      throw new HttpException(401, 'Access token non valido o scaduto');
    }
  }
}
