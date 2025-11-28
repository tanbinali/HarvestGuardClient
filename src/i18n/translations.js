export const translations = {
  EN: {
    app: {
      name: 'HarvestGuard',
      tagline: 'Protect Your Harvest, Secure Your Future'
    },
    landing: {
      hero: {
        title: 'Stop Food Loss Before It Happens',
        subtitle: 'Bangladesh loses 14% of its food production annually. HarvestGuard helps you protect every grain.',
        cta: 'Start Protecting Now',
        stats: {
          loss: '14% Food Lost',
          farmers: '30M+ Farmers Affected',
          value: '$4B Annual Loss'
        }
      },
      problem: {
        title: 'The Crisis We Face',
        description: 'Every year, millions of farming families lose their hard-earned harvest to preventable causes.',
        causes: {
          pest: 'Pest Infestation',
          disease: 'Crop Disease',
          weather: 'Weather Damage',
          storage: 'Poor Storage'
        }
      },
      solution: {
        title: 'How HarvestGuard Works',
        steps: {
          data: { title: 'Log Your Harvest', desc: 'Register your crop batches quickly' },
          warning: { title: 'Get Early Warnings', desc: 'Receive alerts about potential risks' },
          action: { title: 'Take Action', desc: 'Apply recommended interventions' },
          saved: { title: 'Save Your Crops', desc: 'Reduce losses & increase income' }
        }
      },
      features: {
        title: 'Why Choose HarvestGuard?',
        offline: { title: 'Works Offline', desc: 'No internet? No problem. Sync when connected.' },
        simple: { title: 'Easy to Use', desc: 'Designed for everyone, regardless of tech experience.' },
        free: { title: 'Free to Start', desc: 'Start protecting your harvest today at no cost.' },
        badges: { title: 'Earn Rewards', desc: 'Unlock achievements as you protect your crops.' }
      }
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phone: 'Phone Number',
      firstName: 'First Name',
      lastName: 'Last Name',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      loginSuccess: 'Welcome back!',
      registerSuccess: 'Account created successfully!'
    },
    dashboard: {
      welcome: 'Welcome',
      overview: 'Overview',
      totalBatches: 'Total Batches',
      activeBatches: 'Active Batches',
      lossEvents: 'Loss Events',
      interventions: 'Interventions',
      successRate: 'Success Rate',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      addBatch: 'Add New Batch',
      viewAll: 'View All'
    },
    crops: {
      title: 'My Crops',
      addBatch: 'Add New Batch',
      noBatches: 'No crop batches yet. Add your first harvest!',
      cropType: 'Crop Type',
      weight: 'Estimated Weight (kg)',
      harvestDate: 'Harvest Date',
      storageLocation: 'Storage Location',
      storageType: 'Storage Type',
      status: 'Status',
      notes: 'Notes (Optional)',
      active: 'Active',
      completed: 'Completed',
      types: {
        PADDY: 'Paddy/Rice'
      },
      storage: {
        JUTE_BAG: 'Jute Bag Stack',
        SILO: 'Silo',
        OPEN_AREA: 'Open Area'
      },
      locations: {
        DHAKA: 'Dhaka',
        CHITTAGONG: 'Chittagong',
        SYLHET: 'Sylhet',
        RAJSHAHI: 'Rajshahi',
        KHULNA: 'Khulna',
        BARISHAL: 'Barishal',
        RANGPUR: 'Rangpur',
        MYMENSINGH: 'Mymensingh'
      }
    },
    lossEvents: {
      title: 'Loss Events',
      addEvent: 'Report Loss',
      noEvents: 'No loss events recorded.',
      eventDate: 'Event Date',
      lossType: 'Type of Loss',
      estimatedLoss: 'Estimated Loss (kg)',
      description: 'Description',
      types: {
        PEST: 'Pest Infestation',
        DISEASE: 'Disease',
        WEATHER: 'Weather Damage',
        STORAGE: 'Storage Loss',
        OTHER: 'Other'
      }
    },
    interventions: {
      title: 'Interventions',
      addIntervention: 'Add Intervention',
      noInterventions: 'No interventions recorded.',
      interventionType: 'Intervention Type',
      appliedDate: 'Applied Date',
      success: 'Was it successful?',
      notes: 'Notes',
      types: {
        PESTICIDE: 'Pesticide Applied',
        FUNGICIDE: 'Fungicide Applied',
        IRRIGATION: 'Irrigation Adjustment',
        STORAGE: 'Improved Storage',
        OTHER: 'Other'
      }
    },
    achievements: {
      title: 'My Achievements',
      noAchievements: 'No achievements yet. Keep protecting your crops!',
      earnedOn: 'Earned on',
      badges: {
        FIRST_HARVEST: { name: 'First Harvest', desc: 'Logged your first crop batch' },
        RISK_MITIGATOR: { name: 'Risk Mitigator', desc: 'Successfully applied an intervention' },
        SCANNER_MASTER: { name: 'Scanner Master', desc: 'Used health scanning features' },
        WEATHER_ANALYST: { name: 'Weather Analyst', desc: 'Monitored weather conditions' },
        DATA_KEEPER: { name: 'Data Keeper', desc: 'Maintained consistent records' }
      }
    },
    profile: {
      title: 'My Profile',
      editProfile: 'Edit Profile',
      language: 'Preferred Language',
      logout: 'Logout',
      stats: 'My Statistics'
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      offline: 'You are offline. Changes will sync when connected.',
      syncing: 'Syncing...',
      yes: 'Yes',
      no: 'No'
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      crops: 'My Crops',
      achievements: 'Achievements',
      profile: 'Profile'
    }
  },
  BN: {
    app: {
      name: 'হার্ভেস্টগার্ড',
      tagline: 'আপনার ফসল রক্ষা করুন, ভবিষ্যত সুরক্ষিত করুন'
    },
    landing: {
      hero: {
        title: 'খাদ্য অপচয় হওয়ার আগেই থামান',
        subtitle: 'বাংলাদেশে বার্ষিক ১৪% খাদ্য উৎপাদন নষ্ট হয়। হার্ভেস্টগার্ড প্রতিটি শস্যদানা রক্ষা করতে সাহায্য করে।',
        cta: 'এখনই সুরক্ষা শুরু করুন',
        stats: {
          loss: '১৪% খাদ্য অপচয়',
          farmers: '৩ কোটি+ কৃষক প্রভাবিত',
          value: '৪০০ কোটি ডলার বার্ষিক ক্ষতি'
        }
      },
      problem: {
        title: 'আমরা যে সংকটের মুখোমুখি',
        description: 'প্রতি বছর, লক্ষ লক্ষ কৃষক পরিবার প্রতিরোধযোগ্য কারণে তাদের কষ্টার্জিত ফসল হারায়।',
        causes: {
          pest: 'পোকামাকড়ের আক্রমণ',
          disease: 'ফসলের রোগ',
          weather: 'আবহাওয়ার ক্ষতি',
          storage: 'দুর্বল সংরক্ষণ'
        }
      },
      solution: {
        title: 'হার্ভেস্টগার্ড কীভাবে কাজ করে',
        steps: {
          data: { title: 'ফসল নিবন্ধন করুন', desc: 'দ্রুত আপনার ফসলের ব্যাচ রেজিস্টার করুন' },
          warning: { title: 'সতর্কতা পান', desc: 'সম্ভাব্য ঝুঁকি সম্পর্কে সতর্কতা পান' },
          action: { title: 'পদক্ষেপ নিন', desc: 'প্রস্তাবিত হস্তক্ষেপ প্রয়োগ করুন' },
          saved: { title: 'ফসল বাঁচান', desc: 'ক্ষতি কমান ও আয় বাড়ান' }
        }
      },
      features: {
        title: 'কেন হার্ভেস্টগার্ড বেছে নেবেন?',
        offline: { title: 'অফলাইনে কাজ করে', desc: 'ইন্টারনেট নেই? সমস্যা নেই। সংযুক্ত হলে সিঙ্ক হবে।' },
        simple: { title: 'ব্যবহার সহজ', desc: 'সবার জন্য ডিজাইন করা, প্রযুক্তি অভিজ্ঞতা নির্বিশেষে।' },
        free: { title: 'বিনামূল্যে শুরু', desc: 'আজই বিনামূল্যে আপনার ফসল রক্ষা শুরু করুন।' },
        badges: { title: 'পুরস্কার অর্জন', desc: 'ফসল রক্ষা করার সাথে সাথে অর্জন আনলক করুন।' }
      }
    },
    auth: {
      login: 'লগইন',
      register: 'নিবন্ধন',
      email: 'ইমেইল ঠিকানা',
      password: 'পাসওয়ার্ড',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      phone: 'ফোন নম্বর',
      firstName: 'প্রথম নাম',
      lastName: 'শেষ নাম',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      noAccount: 'অ্যাকাউন্ট নেই?',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      loginSuccess: 'স্বাগতম!',
      registerSuccess: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!'
    },
    dashboard: {
      welcome: 'স্বাগতম',
      overview: 'সংক্ষিপ্ত বিবরণ',
      totalBatches: 'মোট ব্যাচ',
      activeBatches: 'সক্রিয় ব্যাচ',
      lossEvents: 'ক্ষতির ঘটনা',
      interventions: 'হস্তক্ষেপ',
      successRate: 'সফলতার হার',
      recentActivity: 'সাম্প্রতিক কার্যকলাপ',
      quickActions: 'দ্রুত কর্ম',
      addBatch: 'নতুন ব্যাচ যোগ করুন',
      viewAll: 'সব দেখুন'
    },
    crops: {
      title: 'আমার ফসল',
      addBatch: 'নতুন ব্যাচ যোগ করুন',
      noBatches: 'এখনও কোনো ফসলের ব্যাচ নেই। আপনার প্রথম ফসল যোগ করুন!',
      cropType: 'ফসলের ধরন',
      weight: 'আনুমানিক ওজন (কেজি)',
      harvestDate: 'কাটার তারিখ',
      storageLocation: 'সংরক্ষণের স্থান',
      storageType: 'সংরক্ষণের ধরন',
      status: 'অবস্থা',
      notes: 'নোট (ঐচ্ছিক)',
      active: 'সক্রিয়',
      completed: 'সম্পন্ন',
      types: {
        PADDY: 'ধান/চাল'
      },
      storage: {
        JUTE_BAG: 'পাটের বস্তার স্তূপ',
        SILO: 'সাইলো',
        OPEN_AREA: 'খোলা জায়গা'
      },
      locations: {
        DHAKA: 'ঢাকা',
        CHITTAGONG: 'চট্টগ্রাম',
        SYLHET: 'সিলেট',
        RAJSHAHI: 'রাজশাহী',
        KHULNA: 'খুলনা',
        BARISHAL: 'বরিশাল',
        RANGPUR: 'রংপুর',
        MYMENSINGH: 'ময়মনসিংহ'
      }
    },
    lossEvents: {
      title: 'ক্ষতির ঘটনা',
      addEvent: 'ক্ষতি রিপোর্ট করুন',
      noEvents: 'কোনো ক্ষতির ঘটনা রেকর্ড করা হয়নি।',
      eventDate: 'ঘটনার তারিখ',
      lossType: 'ক্ষতির ধরন',
      estimatedLoss: 'আনুমানিক ক্ষতি (কেজি)',
      description: 'বিবরণ',
      types: {
        PEST: 'পোকামাকড়ের আক্রমণ',
        DISEASE: 'রোগ',
        WEATHER: 'আবহাওয়ার ক্ষতি',
        STORAGE: 'সংরক্ষণ ক্ষতি',
        OTHER: 'অন্যান্য'
      }
    },
    interventions: {
      title: 'হস্তক্ষেপ',
      addIntervention: 'হস্তক্ষেপ যোগ করুন',
      noInterventions: 'কোনো হস্তক্ষেপ রেকর্ড করা হয়নি।',
      interventionType: 'হস্তক্ষেপের ধরন',
      appliedDate: 'প্রয়োগের তারিখ',
      success: 'এটি কি সফল ছিল?',
      notes: 'নোট',
      types: {
        PESTICIDE: 'কীটনাশক প্রয়োগ',
        FUNGICIDE: 'ছত্রাকনাশক প্রয়োগ',
        IRRIGATION: 'সেচ সমন্বয়',
        STORAGE: 'উন্নত সংরক্ষণ',
        OTHER: 'অন্যান্য'
      }
    },
    achievements: {
      title: 'আমার অর্জন',
      noAchievements: 'এখনও কোনো অর্জন নেই। আপনার ফসল রক্ষা করতে থাকুন!',
      earnedOn: 'অর্জনের তারিখ',
      badges: {
        FIRST_HARVEST: { name: 'প্রথম ফসল', desc: 'আপনার প্রথম ফসলের ব্যাচ লগ করেছেন' },
        RISK_MITIGATOR: { name: 'ঝুঁকি নিরসনকারী', desc: 'সফলভাবে একটি হস্তক্ষেপ প্রয়োগ করেছেন' },
        SCANNER_MASTER: { name: 'স্ক্যানার মাস্টার', desc: 'স্বাস্থ্য স্ক্যানিং বৈশিষ্ট্য ব্যবহার করেছেন' },
        WEATHER_ANALYST: { name: 'আবহাওয়া বিশ্লেষক', desc: 'আবহাওয়ার অবস্থা পর্যবেক্ষণ করেছেন' },
        DATA_KEEPER: { name: 'তথ্য রক্ষক', desc: 'ধারাবাহিক রেকর্ড বজায় রেখেছেন' }
      }
    },
    profile: {
      title: 'আমার প্রোফাইল',
      editProfile: 'প্রোফাইল সম্পাদনা',
      language: 'পছন্দের ভাষা',
      logout: 'লগআউট',
      stats: 'আমার পরিসংখ্যান'
    },
    common: {
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      delete: 'মুছুন',
      edit: 'সম্পাদনা',
      back: 'পিছনে',
      next: 'পরবর্তী',
      loading: 'লোড হচ্ছে...',
      error: 'কিছু ভুল হয়েছে',
      success: 'সফল!',
      offline: 'আপনি অফলাইনে আছেন। সংযুক্ত হলে পরিবর্তন সিঙ্ক হবে।',
      syncing: 'সিঙ্ক হচ্ছে...',
      yes: 'হ্যাঁ',
      no: 'না'
    },
    nav: {
      home: 'হোম',
      dashboard: 'ড্যাশবোর্ড',
      crops: 'আমার ফসল',
      achievements: 'অর্জন',
      profile: 'প্রোফাইল'
    }
  }
}
