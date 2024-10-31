export default {
  nav: {
    home: "الصفحة الرئيسية",
    myListings: "إعلاناتي",
    addListing: "إضافة إعلان",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    rimIjar: "ريم إيجار",
    labo: "مختبر",
    Avances:"متقدم"
  },
  addAnnonce: {
    welcome: "أهلاً بك",
    addNew: "إضافة إعلان",
    mockedData: "البيانات ليست مخزنة في قاعدة البيانات mocked بعد.",
    annonceType: "نوع الإعلان",
    selectType: "اختر نوعًا",
    location: "إيجار",
    sale: "بيع",
    service: "خدمة",
    other: "آخر",
    category: "الفئة",
    categories: {
      immobilier: "العقارات",
      véhicule: "السيارات",
      Emploi: "الوظائف"
    },
    subCategories: {
      maison: "منزل",
      appartement: "شقة",
      voiture: "سيارة",
      moto: "دراجة نارية",
      CDI: "عقد دائم",
      CDD: "عقد مؤقت"
    },
    selectCategory: "اختر فئة",
    subCategory: "الفئة الفرعية",
    selectSubCategory: "اختر فئة فرعية",
    description: "الوصف",
    price: "السعر باليوم (€)",
    submitButton: "إضافة الإعلان",
  },
  pagination: {
    next: "التالي",
    prev: "السابق",
    currentPage: "الصفحة",
    of: "من",
  },
  connexion: {
    title: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    forgotPassword: "نسيت كلمة المرور؟",
    noAccount: "لا تملك حسابًا؟",
    createAccount: "إنشاء حساب",
    invalidCredentials: "بيانات اعتماد غير صحيحة",
    emailLabel:"بريد إلكتروني",
    passwordLabel:"كلمة المرور",
    confirmPasswordLabel:"تأكيد كلمة المرور",
    submitButton:"تسجيل الدخول",
    passwordsNotMatch:"",
    passwordMinLength:"",
    passwordRequired:"",
    emailInvalid:"",
    emailRequired:"",
    success:"",
    unexpectedError:"",
    error:"",
    sendingData:"",
    validationInProgress:"",
    validationFailed:"",
    passwordShort:"",
  },
  register: {
    title: "إنشاء حساب",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signupButton: "إنشاء حساب",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    loginHere: "تسجيل الدخول هنا",
    passwordMismatch: "كلمتا المرور غير متطابقتين",
    accountCreated: "تم إنشاء الحساب بنجاح",
    emailLabel:"بريد إلكتروني",
    passwordLabel:"كلمة المرور",
    confirmPasswordLabel:"تأكيد كلمة المرور",
    submitButton:"إنشاء حساب",
    passwordsNotMatch:"",
    passwordMinLength:"",
    passwordRequired:"",
    emailInvalid:"",
    emailRequired:"",
    success:""
  },
  footer: {
    aboutUs: "معلومات عنا",
    contact: "اتصل بنا",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    followUs: "تابعنا",
  },
  errors: {
    required: "هذا الحقل مطلوب",
    invalidEmail: "البريد الإلكتروني غير صالح",
    minLength: "يجب أن يحتوي هذا الحقل على {min} أحرف على الأقل",
    maxLength: "لا يمكن أن يحتوي هذا الحقل على أكثر من {max} أحرف",
  },
  successMessages: {
    listingAdded: "تمت إضافة الإعلان بنجاح",
    profileUpdated: "تم تحديث الملف الشخصي بنجاح",
    passwordChanged: "تم تغيير كلمة المرور بنجاح",
  },
  validation: {
    emailRequired: "البريد الإلكتروني مطلوب",
    passwordRequired: "كلمة المرور مطلوبة",
    invalidPassword: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
    firstNameRequired: "الاسم الأول مطلوب",
    lastNameRequired: "الاسم الأخير مطلوب",
  },
} as const;
