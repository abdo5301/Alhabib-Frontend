export default defineEventHandler(async(event)=>{
try {
  const files = await readMultipartFormData(event)
  console.log(files);
} catch (error) {
  return createError({'statusCode': 500, statusMessage:'Api Image Upload Error'})
}
})