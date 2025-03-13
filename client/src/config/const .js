// export const products = [
//   {
//     label: "Product Name",
//     name: "productName1",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   },
//   {
//     label: "Product Name",
//     name: "productName2",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   },
//   {
//     label: "Product Name",
//     name: "productName3",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   },
//   {
//     label: "Product Name",
//     name: "productName4",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   },
//   {
//     label: "Product Name",
//     name: "productName5",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   },
//   {
//     label: "Product Name",
//     name: "productName6",
//     componentType: "input",
//     type: "text",
//     placeholder: "Enter product name"
//   }
// ];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options:[{id:"Hawan Essentials",label:"Hawan Essentials"},
      {id:"Dhoop & Fragrances",label:"Dhoop & Fragrances"},
      {id:"Sacred Purification Items",label:"Sacred Purification Items"},
      {id:"Festival Special Kits",label:"Festival Special Kits"},
      {id:"Ceremonial & Ritual Kits",label:"Ceremonial & Ritual Kits"},
      {id:"Festival-Based Shopping",label:"Festival-Based Shopping"},
      {id:"Ritual-Specific Shopping",label:"Ritual-Specific Shopping"}
    ]
    
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "input",
    type:"text",
    placeholder:" Enter Brand"
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "StarProduct",
    name: "starProduct",
    componentType: "select",
    options:[{id:"true",label:"Yes"},
      {id:"false",label:"No"},
    ]
    
  }
];


export const filterOptions=[{id:"Hawan Essentials",label:"Hawan Essentials",path:"/shop/category/havan"},
  {id:"Dhoop & Fragrances",label:"Dhoop & Fragrances",path:"/shop/category/dhoop"},
  {id:"Sacred Purification Items",label:"Sacred Purification Items",path:"/shop/category/sacred"},
  {id:"Festival Special Kits",label:"Festival Special Kits",path:"/shop/category/festival"},
  {id:"Ceremonial & Ritual Kits",label:"Ceremonial & Ritual Kits",path:"/shop/category/ceremonial"},
  {id:"Festival-Based Shopping",label:"Festival-Based Shopping",path:"/shop/category/fest"},
  {id:"Ritual-Specific Shopping",label:"Ritual-Specific Shopping",path:"/shop/category/ritual"}
]


export const festivalOptions=[{ id: "Navratri Pooja Kit", label: "Navratri Pooja Kit", path: "/shop/category/festival" },
  { id: "Diwali Pooja Kit", label: "Diwali Pooja Kit", path: "/shop/category/festival" },
  { id: "Ganesh Chaturthi Pooja Kit", label: "Ganesh Chaturthi Pooja Kit", path: "/shop/category/festival" },
  { id: "Maha Shivratri Pooja Kit", label: "Maha Shivratri Pooja Kit", path: "/shop/category/festival" },
  { id: "Karva Chauth Pooja Kit", label: "Karva Chauth Pooja Kit", path: "/shop/category/festival" },
  { id: "Durga Pooja Kit", label: "Durga Pooja Kit", path: "/shop/category/festival" },
  { id: "Basant Panchami Pooja Kit", label: "Basant Panchami Pooja Kit", path: "/shop/category/festival" },
  { id: "Raksha Bandhan Pooja Kit", label: "Raksha Bandhan Pooja Kit", path: "/shop/category/festival" }
]

export const aboutUs=[{id:"Our Story"},
  {id:"Store Locator"},
  {id:"Blog"},
  {id:"Careers"},
  {id:"Affiliate Program"},
]

export const QuickLinks=[{id:"Shop All"},
  {id:"Diwali Gift"},
  {id:"Sale"},
  {id:"Gift Cards"},
  {id:"Offers"},
]

export const Help=[{id:"Create A Return"},
  {id:"Shipping"},
  {id:"Privacy Policy"},
  {id:"Return Policy"},
  {id:"Terms and Conditions"},
  {id:"Contact Us"},
  {id:"FAQs"},
]

export const WeAccept=[
  {id:"a"},{id:"b"},
  {id:"c"},
  {id:"d"},


]
    
  


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "HOME",
    path: "/shop/home",
  },
  {
    id: "categories",
    label: "CATEGORIES",
    path: "/shop/category",
  },
  {
    id: "allProducts",
    label: "ALL PRODUCTS",
    path: "/shop/listing",
  },
  {
    id: "why",
    label: "WHY CHOOSE US?",
    path: "#why",
  },
  {
    id: "testimonials",
    label: "TESTIMONIALS",
    path: "#testimonials",
  },
  {
    id: "blogs",
    label: "BLOGS",
    path: "#blogs",
  },
  {
    id: "about",
    label: "ABOUT US",
    path: "/shop/about",
  },
  {
    id: "support",
    label: "CONTACT US",
    path: "/shop/contact-us",
  },
  
];

// export const categoryOptionsMap = {
//   men: "Men",
//   women: "Women",
//   kids: "Kids",
//   accessories: "Accessories",
//   footwear: "Footwear",  
// };

// export const brandOptionsMap = {
//   nike: "Nike",
//   adidas: "Adidas",
//   puma: "Puma",
//   levi: "Levi",
//   zara: "Zara",
//   "h&m": "H&M",
// };

// export const filterOptions = {
//   category: [
//     { id: "men", label: "Men" },
//     { id: "women", label: "Women" },
//     { id: "kids", label: "Kids" },
//     { id: "accessories", label: "Accessories" },
//     { id: "footwear", label: "Footwear" },
//   ],
//   brand: [
//     { id: "nike", label: "Nike" },
//     { id: "adidas", label: "Adidas" },
//     { id: "puma", label: "Puma" },
//     { id: "levi", label: "Levi's" },
//     { id: "zara", label: "Zara" },
//     { id: "h&m", label: "H&M" },
//   ],
// };



export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];