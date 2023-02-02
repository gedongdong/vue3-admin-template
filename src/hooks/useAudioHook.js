export default () => {
  const successAudio = () => {
    new Audio('http://youjiausa.com/static/admin/success.mp3').play()
  }

  const skuNotExists = () => {
    new Audio('http://youjiausa.com/static/admin/sku_not_exists.mp3').play()
  }

  return {
    successAudio,
    skuNotExists
  }
}
