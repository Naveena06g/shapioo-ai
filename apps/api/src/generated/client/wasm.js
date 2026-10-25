
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  passwordHash: 'passwordHash',
  role: 'role',
  active: 'active',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShopScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  name: 'name',
  type: 'type',
  area: 'area',
  deliveryFee: 'deliveryFee',
  minOrder: 'minOrder',
  verified: 'verified',
  createdAt: 'createdAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  shopId: 'shopId',
  name: 'name',
  category: 'category',
  price: 'price',
  unit: 'unit',
  stock: 'stock',
  active: 'active',
  createdAt: 'createdAt'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  productId: 'productId',
  qty: 'qty',
  createdAt: 'createdAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  total: 'total',
  createdAt: 'createdAt'
};

exports.Prisma.OrderGroupScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  shopId: 'shopId',
  status: 'status',
  subtotal: 'subtotal',
  delivery: 'delivery'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  productId: 'productId',
  name: 'name',
  price: 'price',
  qty: 'qty'
};

exports.Prisma.CropListingScalarFieldEnum = {
  id: 'id',
  farmerId: 'farmerId',
  name: 'name',
  variety: 'variety',
  qty: 'qty',
  unit: 'unit',
  price: 'price',
  moq: 'moq',
  grade: 'grade',
  location: 'location',
  harvestDate: 'harvestDate',
  imageUrl: 'imageUrl',
  active: 'active',
  createdAt: 'createdAt'
};

exports.Prisma.OfferScalarFieldEnum = {
  id: 'id',
  cropId: 'cropId',
  traderId: 'traderId',
  qty: 'qty',
  price: 'price',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  title: 'title',
  organization: 'organization',
  location: 'location',
  type: 'type',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.JobApplicationScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  userId: 'userId',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.VerificationRequestScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.WarehouseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  capacity: 'capacity',
  used: 'used',
  price: 'price',
  type: 'type'
};

exports.Prisma.StorageBookingScalarFieldEnum = {
  id: 'id',
  warehouseId: 'warehouseId',
  farmerId: 'farmerId',
  cropName: 'cropName',
  qty: 'qty',
  months: 'months',
  startDate: 'startDate',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  icon: 'icon',
  modules: 'modules'
};

exports.Prisma.CourseEnrollmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  createdAt: 'createdAt'
};

exports.Prisma.BulkOrderScalarFieldEnum = {
  id: 'id',
  cropName: 'cropName',
  qty: 'qty',
  price: 'price',
  status: 'status',
  traderId: 'traderId',
  farmerId: 'farmerId',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Shop: 'Shop',
  Product: 'Product',
  CartItem: 'CartItem',
  Order: 'Order',
  OrderGroup: 'OrderGroup',
  OrderItem: 'OrderItem',
  CropListing: 'CropListing',
  Offer: 'Offer',
  Job: 'Job',
  JobApplication: 'JobApplication',
  VerificationRequest: 'VerificationRequest',
  Warehouse: 'Warehouse',
  StorageBooking: 'StorageBooking',
  Course: 'Course',
  CourseEnrollment: 'CourseEnrollment',
  BulkOrder: 'BulkOrder'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
