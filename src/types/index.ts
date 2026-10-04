export type AxlePosition = 'steer' | 'drive' | 'trailer' | 'all-position';
export type TyreApplication = 'long-haul' | 'regional' | 'urban' | 'mixed' | 'on-off-road';
export type TyreCategory = 'truck' | 'bus';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  isAuthorisedDistributor: boolean;
  warrantySummary: string;
  originCountry: string;
  logoText: string;
  heroImage: string;
}

export interface ProductSku {
  id: string;
  patternId: string;
  patternCode: string;
  brandName: string;
  size: string;
  fullSizeCode: string;
  loadIndexSingle: number;
  loadIndexDual: number;
  speedSymbol: string;
  plyRating: string;
  tubeless: 'TL' | 'TT';
  treadDepthMm: number;
  overallDiameterMm: number;
  sectionWidthMm: number;
  approvedRim: string;
  maxLoadSingleKg: number;
  maxLoadDualKg: number;
  maxInflationKpa: number;
  weightKg: number;
  axlePosition: AxlePosition;
  application: TyreApplication;
  category: TyreCategory;
  inStockBranches: {
    rocklea: number;
    yatala: number;
    baldhills: number;
  };
  incomingQty: number;
  incomingEta: string;
}

export interface Pattern {
  id: string;
  brandId: string;
  brandName: string;
  code: string;
  name: string;
  category: TyreCategory;
  positions: AxlePosition[];
  applications: TyreApplication[];
  features: string[];
  description: string;
  treadDepthMm: number;
  plyRating: string;
  heroImage: string;
  treadImage: string;
  datasheetPdf: string;
  skus: ProductSku[];
}

export interface PriceMatrixBand {
  minQty: number;
  maxQty: number;
  unitPrice: number;
}

export interface SkuPriceMatrix {
  skuId: string;
  baseBands: {
    '1-3': number;
    '4-7': number;
    '8-19': number;
    '20-49': number;
    '50+': number;
  };
}

export interface Dealer {
  id: string;
  businessName: string;
  abn: string;
  tradingName: string;
  businessType: 'tyre_retailer' | 'fleet_operator' | 'workshop' | 'transport_company';
  tier: 'A' | 'B' | 'C';
  branchAssigned: 'Rocklea' | 'Yatala' | 'Bald Hills';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: string;
  status: 'active' | 'pending' | 'suspended';
  accountTerms: '30-day' | 'pay-per-order';
  fleetSize?: number;
}

export type UserRole = 'owner' | 'buyer' | 'staff' | 'admin';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dealerId?: string;
  dealerName?: string;
  branch?: string;
  tier?: 'A' | 'B' | 'C';
}

export interface CartItem {
  skuId: string;
  patternName: string;
  patternCode: string;
  brandName: string;
  size: string;
  fullSizeCode: string;
  axlePosition: AxlePosition;
  quantity: number;
  notes?: string;
}

export type RfqStatus = 'submitted' | 'quote_ready' | 'accepted' | 'declined' | 'expired';

export interface QuoteLine {
  skuId: string;
  brand: string;
  pattern: string;
  size: string;
  fullSizeCode: string;
  quantity: number;
  unitPrice?: number;
  discountPercent?: number;
  lineTotal?: number;
  alternativeOffered?: {
    skuId: string;
    brand: string;
    pattern: string;
    size: string;
    unitPrice: number;
    reason: string;
  };
}

export interface PricingRequest {
  id: string;
  quoteNumber: string;
  dealerId: string;
  dealerName: string;
  requestedBy: string;
  createdAt: string;
  requiredByDate: string;
  deliveryType: 'delivery' | 'pickup';
  branchOrAddress: string;
  poNumber: string;
  status: RfqStatus;
  lines: QuoteLine[];
  pricingStaffNotes?: string;
  subtotal?: number;
  freight?: number;
  gst?: number;
  total?: number;
  quotedAt?: string;
  expiresAt?: string;
  assignedStaff?: string;
  threadMessages?: {
    sender: string;
    role: string;
    time: string;
    message: string;
  }[];
}

export type OrderStatus = 'confirmed' | 'ready_for_pickup' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  quoteNumber: string;
  rfqId: string;
  dealerId: string;
  dealerName: string;
  createdAt: string;
  requiredByDate: string;
  deliveryType: 'delivery' | 'pickup';
  branchOrAddress: string;
  poNumber: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  freight: number;
  gst: number;
  lines: QuoteLine[];
  trackingNumber?: string;
  carrier?: string;
  bayNumber?: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  isHq: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DealerApplication {
  id: string;
  businessName: string;
  abn: string;
  abnValid: boolean;
  gstRegistered: boolean;
  tradingName: string;
  businessType: string;
  yearsTrading: number;
  contactName: string;
  role: string;
  email: string;
  mobile: string;
  deliveryAddress: string;
  estimatedMonthlyVolume: string;
  brandsOfInterest: string[];
  creditPreference: 'pay-per-order' | '30-day';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
