import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Dashboard
      dashboard: 'Dashboard',
      overallCompletion: 'Overall Completion',
      totalCompleted: 'Total Completed',
      streak: 'Streak',
      xp: 'XP',
      level: 'Level',
      activeGoals: 'Active Goals',
      completedGoals: 'Completed Goals',
      days: 'days',
      points: 'points',
      
      // Goals
      goals: 'Goals',
      allGoals: 'All Goals',
      newGoal: 'New Goal',
      createGoal: 'Create Goal',
      editGoal: 'Edit Goal',
      goalTitle: 'Goal Title',
      category: 'Category',
      goalType: 'Goal Type',
      target: 'Target',
      startDate: 'Start Date',
      endDate: 'End Date',
      notes: 'Notes',
      progress: 'Progress',
      status: 'Status',
      active: 'Active',
      paused: 'Paused',
      completed: 'Completed',
      archive: 'Archive',
      
      // Categories
      health: 'Health',
      study: 'Study',
      work: 'Work',
      personal: 'Personal',
      other: 'Other',
      
      // Goal Types
      daily: 'Daily',
      countBased: 'Count-Based',
      timeBased: 'Time-Based',
      
      // Actions
      markProgress: 'Mark Progress',
      edit: 'Edit',
      pause: 'Pause',
      resume: 'Resume',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete_confirmation: 'Are you sure you want to delete this goal?',
      
      // Settings
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      
      // Messages
      noGoals: 'No goals yet. Create your first goal!',
      noCompleted: 'No completed goals yet.',
      goalCreatedSuccess: 'Goal created successfully!',
      goalUpdatedSuccess: 'Goal updated successfully!',
      goalDeletedSuccess: 'Goal deleted successfully!',
      
      // 404
      notFound: 'Page Not Found',
      goHome: 'Go Home',
    }
  },
  fa: {
    translation: {
      // Dashboard
      dashboard: 'داشبورد',
      overallCompletion: 'درصد کلی تکمیل',
      totalCompleted: 'کل تکمیل شده',
      streak: 'امتیاز پیوسته',
      xp: 'امتیاز',
      level: 'سطح',
      activeGoals: 'اهداف فعال',
      completedGoals: 'اهداف تکمیل شده',
      days: 'روز',
      points: 'امتیاز',
      
      // Goals
      goals: 'اهداف',
      allGoals: 'تمام اهداف',
      newGoal: 'هدف جدید',
      createGoal: 'ایجاد هدف',
      editGoal: 'ویرایش هدف',
      goalTitle: 'عنوان هدف',
      category: 'دسته بندی',
      goalType: 'نوع هدف',
      target: 'هدف',
      startDate: 'تاریخ شروع',
      endDate: 'تاریخ پایان',
      notes: 'یادداشت ها',
      progress: 'پیشرفت',
      status: 'وضعیت',
      active: 'فعال',
      paused: 'متوقف',
      completed: 'تکمیل شده',
      archive: 'بایگانی',
      
      // Categories
      health: 'سلامتی',
      study: 'تحصیل',
      work: 'کار',
      personal: 'شخصی',
      other: 'دیگر',
      
      // Goal Types
      daily: 'روزانه',
      countBased: 'مبتنی بر تعداد',
      timeBased: 'مبتنی بر زمان',
      
      // Actions
      markProgress: 'ثبت پیشرفت',
      edit: 'ویرایش',
      pause: 'توقف',
      resume: 'ادامه',
      delete: 'حذف',
      save: 'ذخیره',
      cancel: 'لغو',
      confirm: 'تایید',
      delete_confirmation: 'آیا می خواهید این هدف را حذف کنید؟',
      
      // Settings
      settings: 'تنظیمات',
      language: 'زبان',
      theme: 'تم',
      lightMode: 'حالت روز',
      darkMode: 'حالت شب',
      
      // Messages
      noGoals: 'هیچ هدفی وجود ندارد. اولین هدف خود را ایجاد کنید!',
      noCompleted: 'هنوز هدفی تکمیل نشده است.',
      goalCreatedSuccess: 'هدف با موفقیت ایجاد شد!',
      goalUpdatedSuccess: 'هدف با موفقیت به روز شد!',
      goalDeletedSuccess: 'هدف با موفقیت حذف شد!',
      
      // 404
      notFound: 'صفحه پیدا نشد',
      goHome: 'برگشت به خانه',
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
