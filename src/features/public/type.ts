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
  reverse: boolean
}