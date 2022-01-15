if (!('BarcodeDetector' in window)) {
  console.log('Barcode Detector is not supported by this browser.');
} else {
  console.log('Barcode Detector supported!');
  BarcodeDetector.getSupportedFormats()
  .then(supportedFormats => {
    // supportedFormats.forEach(format => console.log(format));
  });

  var barcodeDetector = new BarcodeDetector({formats: ['qr_code']});
  const imageEl = document.getElementById('qrcode');
  barcodeDetector.detect(imageEl)
  .then(barcodes => {
    console.log(barcodes);
    barcodes.forEach(barcode => console.log(barcode.rawValue));
  })
  .catch(err => {
    console.log(err);
  })
}
