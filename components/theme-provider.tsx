'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props}
      enableSystem={false}
      disableTransitionOnChange={true}
      attribute="class"
      defaultTheme="light"
    >
      {children}
    </NextThemesProvider>
  )
}
