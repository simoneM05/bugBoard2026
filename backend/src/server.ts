import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute, UserRoute, CommentRoute, IssueRoute } from './routes';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new IssueRoute(), new CommentRoute()]);

app.listen();
