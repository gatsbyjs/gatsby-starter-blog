const createSharingImage = ({ cloudName, text }) => {
  const imageTransformations = [
    "w_1200",
    "h_627",
    "c_fill",
    "q_auto",
    "f_auto"
  ].join(", ")

  const textTransformations = [
    "w_600",
    "x_480",
    "y_254",
    "g_south_west",
    "co_white",
    `l_text:roboto_64:${encodeURIComponent(text)}`
  ].join(",")
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`
  return `${baseUrl}${imageTransformations}/${textTransformations}/example_social_card.jpg`
}

export default createSharingImage
