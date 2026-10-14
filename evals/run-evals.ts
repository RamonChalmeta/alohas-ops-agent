import { validateDataAccess } from '../lib/security';

function runSecurityEvals() {
  console.log("=== RUNNING ALOHAS AGENT SECURITY EVALS ===");

  const test1 = validateDataAccess({ userId: 'CUST-A', role: 'EXTERNAL_CUSTOMER' }, 'CUST-B');
  if (test1.allowed === false) {
    console.log("✔ Test 1 PASSED: Unauthorized cross-tenant access blocked & escalated.");
  } else {
    console.error("❌ Test 1 FAILED: User accessed unauthorized customer data!");
    process.exit(1);
  }

  const test2 = validateDataAccess({ userId: 'ADMIN-1', role: 'OPERATIONS_ADMIN' }, 'CUST-B');
  if (test2.allowed === true) {
    console.log("✔ Test 2 PASSED: Admin granted full operational access.");
  } else {
    console.error("❌ Test 2 FAILED: Admin was wrongly blocked!");
    process.exit(1);
  }

  console.log("=== ALL EVALS PASSED (2/2) ===");
}

runSecurityEvals();