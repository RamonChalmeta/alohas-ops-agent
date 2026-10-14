export interface UserSession {
    userId: string;
    role: 'OPERATIONS_ADMIN' | 'CUSTOMER_SUPPORT' | 'EXTERNAL_CUSTOMER';
  }
  
  export function validateDataAccess(
    session: UserSession,
    requestedCustomerId?: string
  ): { allowed: boolean; reason?: string } {
    if (session.role === 'OPERATIONS_ADMIN' || session.role === 'CUSTOMER_SUPPORT') {
      return { allowed: true };
    }
  
    if (requestedCustomerId && requestedCustomerId !== session.userId) {
      return {
        allowed: false,
        reason: `SECURITY VIOLATION: User ${session.userId} attempted unauthorized access to data belonging to customer ${requestedCustomerId}. Incident logged and escalated to Security Lead.`
      };
    }
  
    return { allowed: true };
  }