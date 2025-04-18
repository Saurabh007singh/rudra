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

export const addblogelements=[ {
  label: "Title",
  name: "title",
  componentType: "input",
  type: "text",
  placeholder: "Enter blog title",
},{
  label: "Content",
  name: "content",
  componentType: "textarea",
  placeholder: "Enter content here",
},]

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
      {id:"Ornaments & Wearables",label:"Ornaments & Wearables"},
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
    label: "Product Code",
    name: "productCode",
    componentType: "input",
    type: "number",
    placeholder: "Enter product code",
  },
  {
    label: "Offer",
    name: "offer",
    componentType: "input",
    type: "text",
    placeholder: "Enter offer",
  },
  {
    label: "StarProduct",
    name: "starProduct",
    componentType: "select",
    options:[{id:"true",label:"Yes"},
      {id:"false",label:"No"},
    ]
    
  },
  {
    label: "Features",
    name: "features",
    componentType: "textarea",
    placeholder: "Enter product features",
  },
  {
    label: "Size",
    name: "size",
    componentType: "textarea",
    placeholder: "Enter product size",
  },
  {
    label: "Products Included",
    name: "productsIncluded",
    componentType: "textarea",
    placeholder: "Enter Included product",
  },
  {
    label: "Returns",
    name: "returns",
    componentType: "textarea",
    placeholder: "Enter product return description",
  },
  {
    label: "Care Instructions",
    name: "careInstructions",
    componentType: "textarea",
    placeholder: "Enter product care instructions",
  },
  {
    label: "More Info",
    name: "moreInfo",
    componentType: "textarea",
    placeholder: "Enter more info about the product",
  }
];


export const filterOptions=[{id:"Hawan Essentials",label:"Hawan Essentials",path:"/shop/category/havan",img:"havan",icon:"havanicon"},
  {id:"Dhoop & Fragrances",label:"Dhoop & Fragrances",path:"/shop/category/dhoop",img:"dhoop",icon:"dhoopicon"},
  {id:"Sacred Purification Items",label:"Sacred Purification Items",path:"/shop/category/sacred",img:"sacred",icon:"sacredicon"},
  {id:"Festival Special Kits",label:"Festival Special Kits",path:"/shop/category/festival",img:"festival",icon:"festivalicon"},
  {id:"Ceremonial & Ritual Kits",label:"Ceremonial & Ritual Kits",path:"/shop/category/ceremonial",img:"ceremonial",icon:"cerimonialicon"},
  {id:"Ornaments & Wearables",label:"Ornaments & Wearables",path:"/shop/category/ornaments",img:"ornaments",icon:"ornamentsicon"}
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
    path: "/shop/blogs",
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
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "State",
    name: "state",
    componentType: "select",
    options:[
      { id: "Andhra Pradesh", label: "Andhra Pradesh" },
      { id: "Arunachal Pradesh", label: "Arunachal Pradesh" },
      { id: "Assam", label: "Assam" },
      { id: "Bihar", label: "Bihar" },
      { id: "Chhattisgarh", label: "Chhattisgarh" },
      { id: "Goa", label: "Goa" },
      { id: "Gujarat", label: "Gujarat" },
      { id: "Haryana", label: "Haryana" },
      { id: "Himachal Pradesh", label: "Himachal Pradesh" },
      { id: "Jharkhand", label: "Jharkhand" },
      { id: "Karnataka", label: "Karnataka" },
      { id: "Kerala", label: "Kerala" },
      { id: "Madhya Pradesh", label: "Madhya Pradesh" },
      { id: "Maharashtra", label: "Maharashtra" },
      { id: "Manipur", label: "Manipur" },
      { id: "Meghalaya", label: "Meghalaya" },
      { id: "Mizoram", label: "Mizoram" },
      { id: "Nagaland", label: "Nagaland" },
      { id: "Odisha", label: "Odisha" },
      { id: "Punjab", label: "Punjab" },
      { id: "Rajasthan", label: "Rajasthan" },
      { id: "Sikkim", label: "Sikkim" },
      { id: "Tamil Nadu", label: "Tamil Nadu" },
      { id: "Telangana", label: "Telangana" },
      { id: "Tripura", label: "Tripura" },
      { id: "Uttar Pradesh", label: "Uttar Pradesh" },
      { id: "Uttarakhand", label: "Uttarakhand" },
      { id: "West Bengal", label: "West Bengal" },
      { id: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
      { id: "Chandigarh", label: "Chandigarh" },
      { id: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
      { id: "Lakshadweep", label: "Lakshadweep" },
      { id: "Delhi", label: "Delhi" },
      { id: "Puducherry", label: "Puducherry" }
    ]
    
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Landmark (Optional)",
    name: "landmark",
    componentType: "input",
    placeholder: "Enter Landmark",
  },
];