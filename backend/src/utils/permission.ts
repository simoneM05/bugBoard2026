type Permission = {
  resource: string; // es. 'issues', 'users', 'comments'
  actions: string[]; // es. ['read', 'write', 'delete']
  scope: 'all' | 'own' | 'assigned' | 'readonly'; // ambito permesso
};

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    { resource: 'issues', actions: ['read', 'write', 'delete'], scope: 'all' },
    { resource: 'users', actions: ['read', 'write', 'delete'], scope: 'all' },
    { resource: 'comments', actions: ['read', 'write', 'delete'], scope: 'all' },
  ],
  user: [
    { resource: 'issues', actions: ['read', 'write', 'delete'], scope: 'own' },
    { resource: 'issues', actions: ['read', 'write'], scope: 'assigned' },
    { resource: 'issues', actions: ['read'], scope: 'readonly' },
    { resource: 'users', actions: ['read'], scope: 'readonly' },
    { resource: 'comments', actions: ['read', 'write', 'delete'], scope: 'own' },
  ],
  stakeholder: [
    { resource: 'issues', actions: ['read'], scope: 'readonly' },
    { resource: 'users', actions: ['read'], scope: 'readonly' },
    { resource: 'comments', actions: ['read'], scope: 'readonly' },
  ],
};

interface CheckContext {
  resourceOwnerId?: string; // ID dell'autore della risorsa
  assigneeId?: string; // ID dell'assegnatario della risorsa
  userId: string; // ID dell'utente che sta facendo la richiesta
}

/**
 * Controlla in modo centralizzato se un ruolo ha permesso di eseguire un'azione su una risorsa dato il contesto
 */
export function canPerformAction(
  role: string,
  resource: string,
  action: string,
  context: CheckContext & { isCreation?: boolean } = { userId: '' },
): boolean {
  if (role === 'admin') return true; // Admin può tutto

  const permissions = rolePermissions[role];
  if (!permissions) return false;

  // Filtra permessi che corrispondono a resource e action
  const perms = permissions.filter(p => p.resource === resource && p.actions.includes(action));
  if (perms.length === 0) return false;

  // Controlla se almeno un permesso è valido rispetto al contesto
  return perms.some(p => {
    switch (p.scope) {
      case 'all':
        return true;

      case 'own':
        // Se è creazione (non c'è risorsa esistente), considera permesso valido
        if (action === 'write' && context.isCreation) return true;

        // Altrimenti verifica ownership esplicita
        return context.resourceOwnerId === context.userId;

      case 'assigned':
        return context.assigneeId === context.userId;

      case 'readonly':
        return action === 'read';

      default:
        return false;
    }
  });
}
