# Guide Complet: Redux Toolkit, RTK Query avec Next.js (App Router) et Django

## 1. Configuration Initiale

### Installation des dépendances
```bash
npm install @reduxjs/toolkit react-redux next-redux-wrapper
```

### Structure du projet
```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── store/
│       ├── store.ts
│       ├── features/
│       └── services/
└── components/
```

## 2. Redux Toolkit Basique

### Configuration du Store
```typescript
// lib/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/productsApi';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Création d'un Slice
```typescript
// lib/store/features/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    // Autres reducers...
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
```

### Exemple d'utilisation dans un composant
```typescript
// components/AddToCart.tsx
'use client';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/store/features/cartSlice';

export const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(addItem({
      id: product.id,
      quantity: 1,
      price: product.price
    }))}>
      Ajouter au panier
    </button>
  );
};
```

## 3. RTK Query

### Configuration de l'API
```typescript
// lib/store/services/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products/',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}/`,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: 'products/',
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
} = productsApi;
```

### Provider pour Next.js App Router
```typescript
// app/providers.tsx
'use client';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

### Utilisation dans layout.tsx
```typescript
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Exemple d'utilisation de RTK Query
```typescript
// app/products/page.tsx
'use client';
import { useGetProductsQuery } from '@/lib/store/services/productsApi';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}€</p>
        </div>
      ))}
    </div>
  );
}
```

## 4. Backend Django

### Configuration Django REST framework
```python
# settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### Modèle et Sérialiseur
```python
# models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'created_at']
```

### Vues API
```python
# views.py
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

## 5. Gestion des Erreurs et Optimisations

### Gestion des erreurs RTK Query
```typescript
// lib/store/services/productsApi.ts
export const productsApi = createApi({
  // ...
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products/',
      // Transformation de la réponse
      transformResponse: (response: any) => response.data,
      // Gestion d'erreur personnalisée
      transformErrorResponse: (response: { status: number, data: any }) => {
        return {
          status: response.status,
          message: response.data?.message || 'Une erreur est survenue',
        };
      },
      // Revalidation
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: 'products/',
        method: 'POST',
        body: product,
      }),
      // Invalidation du cache
      invalidatesTags: ['Products'],
    }),
  }),
});
```

### Optimisation des performances
```typescript
// lib/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Persistance sélective
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});
```