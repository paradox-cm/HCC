// Admin Badge Utility Functions
// Standardized badge color functions with proper hover classes for both light and dark modes

export const getStatusColor = (status: string) => {
  switch (status) {
    case "available": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    case "pending": 
      return "!bg-yellow-100 !text-yellow-800 !border-yellow-200 hover:!bg-yellow-200 hover:!border-yellow-300 dark:!bg-yellow-900/20 dark:!text-yellow-400 dark:!border-yellow-800 dark:hover:!bg-yellow-900/40 dark:hover:!border-yellow-700"
    case "reviewed": 
      return "!bg-blue-100 !text-blue-800 !border-blue-200 hover:!bg-blue-200 hover:!border-blue-300 dark:!bg-blue-900/20 dark:!text-blue-400 dark:!border-blue-800 dark:hover:!bg-blue-900/40 dark:hover:!border-blue-700"
    case "archived": 
      return "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"
    // Billing-specific status values
    case "current": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    case "overdue": 
      return "!bg-red-100 !text-red-800 !border-red-200 hover:!bg-red-200 hover:!border-red-300 dark:!bg-red-900/20 dark:!text-red-400 dark:!border-red-800 dark:hover:!bg-red-900/40 dark:hover:!border-red-700"
    case "completed": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    case "approved": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    case "denied": 
      return "!bg-red-100 !text-red-800 !border-red-200 hover:!bg-red-200 hover:!border-red-300 dark:!bg-red-900/20 dark:!text-red-400 dark:!border-red-800 dark:hover:!bg-red-900/40 dark:hover:!border-red-700"
    default: 
      return "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": 
      return "!bg-red-100 !text-red-800 !border-red-200 hover:!bg-red-200 hover:!border-red-300 dark:!bg-red-900/20 dark:!text-red-400 dark:!border-red-800 dark:hover:!bg-red-900/40 dark:hover:!border-red-700"
    case "high": 
      return "!bg-orange-100 !text-orange-800 !border-orange-200 hover:!bg-orange-200 hover:!border-orange-300 dark:!bg-orange-900/20 dark:!text-orange-400 dark:!border-orange-800 dark:hover:!bg-orange-900/40 dark:hover:!border-orange-700"
    case "medium": 
      return "!bg-yellow-100 !text-yellow-800 !border-yellow-200 hover:!bg-yellow-200 hover:!border-yellow-300 dark:!bg-yellow-900/20 dark:!text-yellow-400 dark:!border-yellow-800 dark:hover:!bg-yellow-900/40 dark:hover:!border-yellow-700"
    case "low": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    default: 
      return "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"
  }
}

export const getMessageStatusColor = (status: string) => {
  switch (status) {
    case "urgent": 
      return "!bg-red-100 !text-red-800 !border-red-200 hover:!bg-red-200 hover:!border-red-300 dark:!bg-red-900/20 dark:!text-red-400 dark:!border-red-800 dark:hover:!bg-red-900/40 dark:hover:!border-red-700"
    case "unread": 
      return "!bg-blue-100 !text-blue-800 !border-blue-200 hover:!bg-blue-200 hover:!border-blue-300 dark:!bg-blue-900/20 dark:!text-blue-400 dark:!border-blue-800 dark:hover:!bg-blue-900/40 dark:hover:!border-blue-700"
    case "in-progress": 
      return "!bg-yellow-100 !text-yellow-800 !border-yellow-200 hover:!bg-yellow-200 hover:!border-yellow-300 dark:!bg-yellow-900/20 dark:!text-yellow-400 dark:!border-yellow-800 dark:hover:!bg-yellow-900/40 dark:hover:!border-yellow-700"
    case "completed": 
      return "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700"
    default: 
      return "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"
  }
}

// Standard badge colors for common use cases
export const badgeColors = {
  blue: "!bg-blue-100 !text-blue-800 !border-blue-200 hover:!bg-blue-200 hover:!border-blue-300 dark:!bg-blue-900/20 dark:!text-blue-400 dark:!border-blue-800 dark:hover:!bg-blue-900/40 dark:hover:!border-blue-700",
  green: "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700",
  yellow: "!bg-yellow-100 !text-yellow-800 !border-yellow-200 hover:!bg-yellow-200 hover:!border-yellow-300 dark:!bg-yellow-900/20 dark:!text-yellow-400 dark:!border-yellow-800 dark:hover:!bg-yellow-900/40 dark:hover:!border-yellow-700",
  red: "!bg-red-100 !text-red-800 !border-red-200 hover:!bg-red-200 hover:!border-red-300 dark:!bg-red-900/20 dark:!text-red-400 dark:!border-red-800 dark:hover:!bg-red-900/40 dark:hover:!border-red-700",
  orange: "!bg-orange-100 !text-orange-800 !border-orange-200 hover:!bg-orange-200 hover:!border-orange-300 dark:!bg-orange-900/20 dark:!text-orange-400 dark:!border-orange-800 dark:hover:!bg-orange-900/40 dark:hover:!border-orange-700",
  gray: "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"
} 