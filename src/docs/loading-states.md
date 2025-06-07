# Loading States Documentation

This document explains how to implement loading states for buttons, links, and API calls in the application.

## Available Components

### 1. LoadingButton

Use this component for buttons that trigger API calls or navigation.

```tsx
import { LoadingButton } from "@/components/ui/loading-button";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Make API call
      await someApiCall();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <LoadingButton 
      isLoading={isLoading} 
      onClick={handleClick}
      loadingText="Processing..."
    >
      Submit
    </LoadingButton>
  );
}
```

### 2. LoadingLink

Use this component for links that navigate to other pages.

```tsx
import { LoadingLink } from "@/components/ui/loading-link";

function MyNavigation() {
  return (
    <LoadingLink 
      href="/dashboard" 
      loadingText="Loading Dashboard..."
      showLoadingText={true}
    >
      Dashboard
    </LoadingLink>
  );
}
```

### 3. WithLoading

A wrapper component that shows a skeleton loader or custom loading component.

```tsx
import { WithLoading } from "@/components/ui/with-loading";

function MyDataComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSomeData();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <WithLoading 
      isLoading={isLoading}
      skeletonHeight="h-40"
      skeletonWidth="w-full"
    >
      {data && <DataDisplay data={data} />}
    </WithLoading>
  );
}
```

### 4. LoadingWrapper

A component that handles loading state for any component with onClick handlers.

```tsx
import { LoadingWrapper } from "@/components/ui/loading-wrapper";

function MyComponent() {
  const handleClick = async () => {
    // This will automatically show loading state
    await someApiCall();
  };
  
  return (
    <LoadingWrapper
      id="unique-id"
      onClick={handleClick}
    >
      <button>Click Me</button>
    </LoadingWrapper>
  );
}
```

## Global Loading Context

The application provides a global loading context that can be used to manage loading states across components.

```tsx
import { useLoading } from "@/lib/context/loading-context";

function MyComponent() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  
  const handleClick = async () => {
    startLoading("my-component");
    try {
      await someApiCall();
    } finally {
      stopLoading("my-component");
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      disabled={isLoading("my-component")}
    >
      {isLoading("my-component") ? "Loading..." : "Click Me"}
    </button>
  );
}
```

## Best Practices

1. Always disable buttons during loading to prevent multiple submissions
2. Use try/finally blocks to ensure loading state is reset even if there's an error
3. Show meaningful loading indicators to improve user experience
4. Use skeleton loaders for content that takes time to load
5. Keep loading states localized to the component that's loading 