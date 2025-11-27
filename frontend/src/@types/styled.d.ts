import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    toggleBackground?: string;
    toggleHoverBackground?: string;
    toggleColor?: string;
  }
}
