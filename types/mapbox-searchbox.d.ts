declare module "@mapbox/search-js-react" {
    import { ForwardRefExoticComponent, RefAttributes } from "react";
  
    export const SearchBox: ForwardRefExoticComponent<SearchBoxProps & RefAttributes<unknown>>;
  
    export interface SearchBoxProps {
      accessToken: string;
      map?: mapboxgl.Map;
      mapboxgl: typeof mapboxgl;
      marker?: boolean | mapboxgl.MarkerOptions;
      onRetrieve?: (res: SearchBoxRetrieveResponse) => void;
      onChange?: (value: string) => void;
      onClear?: () => void;
      onSuggest?: (res: SearchBoxSuggestionResponse) => void;
      onSuggestError?: (error: Error) => void;
      placeholder?: string;
      value?: string;
      interceptSearch?: (value: string) => string;
      popoverOptions?: Partial<PopoverOptions>;
      theme?: Theme;
    }
  
    export interface SearchBoxRetrieveResponse {
      features: Array<{
        geometry: {
          coordinates: [number, number];
        };
        place_name: string;
      }>;
    }
  
    export interface SearchBoxSuggestionResponse {
      suggestions: Array<any>;
    }
  
    export interface PopoverOptions {
      // Add your popover options here
    }
  
    export interface Theme {
      // Add your theme options here
    }
  }
  