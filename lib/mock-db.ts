export interface PreorderCampaign {
    sku: string;
    name: string;
    preorderCount: number;
    factoryMOQ: number;
    campaignStatus: 'Active Pre-Order' | 'MOQ Reached - Locking' | 'Sent to Factory' | 'In Production';
    factoryLeadTimeDays: number;
  }
  
  export interface CustomerOrder {
    id: string;
    customerId: string;
    sku: string;
    quantity: number;
    status: 'Pre-order Placed' | 'In Factory Production' | 'Shipped';
    estimatedDelivery: string;
  }
  
  export const MOCK_CAMPAIGNS: Record<string, PreorderCampaign> = {
    "BOOT-LEATHER-38": {
      sku: "BOOT-LEATHER-38",
      name: "Iconic Leather Boots 38",
      preorderCount: 145,
      factoryMOQ: 100,
      campaignStatus: "MOQ Reached - Locking",
      factoryLeadTimeDays: 21
    },
    "SNEAKER-ECO-42": {
      sku: "SNEAKER-ECO-42",
      name: "Sustainable Eco Sneaker 42",
      preorderCount: 42,
      factoryMOQ: 100,
      campaignStatus: "Active Pre-Order",
      factoryLeadTimeDays: 30
    }
  };
  
  export const MOCK_ORDERS: Record<string, CustomerOrder> = {
    "ORD-1001": {
      id: "ORD-1001",
      customerId: "CUST-A",
      sku: "BOOT-LEATHER-38",
      quantity: 1,
      status: "Pre-order Placed",
      estimatedDelivery: "2026-11-15"
    },
    "ORD-1002": {
      id: "ORD-1002",
      customerId: "CUST-B",
      sku: "SNEAKER-ECO-42",
      quantity: 2,
      status: "Pre-order Placed",
      estimatedDelivery: "2026-12-01"
    }
  };