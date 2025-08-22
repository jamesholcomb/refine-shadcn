// React 19 compatibility fixes for Radix UI
declare global {
    namespace React {
        // Override ReactNode to exclude bigint for Radix UI compatibility
        type ReactNode = 
            | ReactElement
            | string
            | number
            | ReactFragment
            | ReactPortal
            | boolean
            | null
            | undefined;
    }
}