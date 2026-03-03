export interface Logo {
  src: string;
  alt: string;
}
export interface Feature extends Logo {
  header: string
  body: string
}
export interface howItWorks{
  no: string
  title: string
  body: string
  src: string
  reverse: boolean
  alt: string
}
export interface testimonial{
  src: string
  name: string
  role: string
  quote: string
  star: number
}