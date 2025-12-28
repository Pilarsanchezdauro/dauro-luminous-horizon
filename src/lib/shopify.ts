import { toast } from "sonner";
import type { CartItem } from "@/stores/cartStore";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'dauro-luminous-horizon-6vj19.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '8765bcd785f87943aa829ab10985ffde';
export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Pago requerido", {
      description: "El acceso a la API de Shopify requiere un plan de facturación activo. Tu tienda necesita actualizarse a un plan de pago."
    });
    throw new Error('Shopify payment required');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          createdAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function getProducts(first: number = 20, after?: string, query?: string) {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, after, query });
  return {
    products: data?.data?.products?.edges || [],
    pageInfo: data?.data?.products?.pageInfo || { hasNextPage: false, endCursor: null }
  };
}

// Fetch all products with pagination
export async function getAllProducts(): Promise<any[]> {
  const allProducts: any[] = [];
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  
  while (hasNextPage) {
    const { products, pageInfo } = await getProducts(250, cursor);
    allProducts.push(...products);
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }
  
  return allProducts;
}

// Fetch all collections
export async function getCollections() {
  const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first: 50 });
  return data?.data?.collections?.edges || [];
}

// Fetch products from a specific collection by handle
export async function getCollectionProducts(handle: string, first: number = 250, after?: string) {
  const data = await storefrontApiRequest(COLLECTION_PRODUCTS_QUERY, { handle, first, after });
  const collection = data?.data?.collectionByHandle;
  if (!collection) return { products: [], pageInfo: { hasNextPage: false, endCursor: null }, collection: null };
  
  return {
    products: collection.products?.edges || [],
    pageInfo: collection.products?.pageInfo || { hasNextPage: false, endCursor: null },
    collection: {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description
    }
  };
}

// Fetch all products from a collection with pagination
export async function getAllCollectionProducts(handle: string): Promise<{ products: any[], collection: any }> {
  const allProducts: any[] = [];
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  let collectionInfo: any = null;
  
  while (hasNextPage) {
    const { products, pageInfo, collection } = await getCollectionProducts(handle, 250, cursor);
    if (collection) collectionInfo = collection;
    allProducts.push(...products);
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }
  
  return { products: allProducts, collection: collectionInfo };
}

export async function getProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle;
}

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    const checkoutUrl = url.toString();
    return checkoutUrl;
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

export async function createCheckoutForProduct(productHandle: string, quantity: number = 1): Promise<string> {
  try {
    console.log('createCheckoutForProduct - Starting with handle:', productHandle);
    
    // First, get the product to obtain its variant ID
    const product = await getProductByHandle(productHandle);
    console.log('createCheckoutForProduct - Product fetched:', product);
    
    if (!product || !product.variants.edges.length) {
      throw new Error('Product not found or has no variants');
    }

    // Get the first available variant
    const variant = product.variants.edges[0].node;
    console.log('createCheckoutForProduct - Using variant:', variant.id);
    
    // Create checkout with this variant
    const lines = [{
      quantity,
      merchandiseId: variant.id,
    }];

    console.log('createCheckoutForProduct - Creating cart with lines:', lines);
    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    console.log('createCheckoutForProduct - Cart data received:', cartData);

    if (!cartData || !cartData.data) {
      throw new Error('No data returned from Shopify');
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    const checkoutUrl = url.toString();
    console.log('createCheckoutForProduct - Final checkout URL:', checkoutUrl);
    return checkoutUrl;
  } catch (error) {
    console.error('Error creating checkout for product:', error);
    throw error;
  }
}
