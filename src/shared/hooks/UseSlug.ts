type slugProps = string | undefined;
const UseSlug = () => {
  const fromSlug = (slug:slugProps)=>{
    if(!slug) return ;
    return slug.replaceAll('-', ' ');
  }
  const toSlug = (slug:slugProps)=>{
    if(!slug) return ;
    return slug.replaceAll(' ', '-').toLowerCase();
  }
  return {
    toSlug, fromSlug
  }
}
export default UseSlug
