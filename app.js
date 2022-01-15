let opts = {
  continuous: true,
  video: document.getElementById('preview'),
  mirror: false,
  captureImage: false,
  backgroundScan: true,
  refractoryPeriod: 5000,
  scanPeriod: 1
};

let scanner = new Instascan.Scanner(opts);
$("#btn-scan").click(function(){
    $("#btn-scan").toggleClass("d-none");
    $("#btn-load").toggleClass("d-none");
    scanner.addListener('scan', function (content) {
    const url = "https://61e1875b63f8fc0017618ce1.mockapi.io/eparkir?utoken="+ content;
    $.get(url, function(data){
      let simStudent = "";
      if (data[0].u_sim == false){
        simStudent = `<br><span class="badge bg-warning m-2">TIDAK MEMILIKI SIM</span>`;
      } else if (data[0].u_sim == true) {
        simStudent = `<br><span class="badge bg-success m-2">MEMILIKI SIM</span>`;
      } else {
        simStudent = "-";
      }
      
      const response = `${data[0].u_name} | ${data[0].u_class} ${simStudent}`;
      Swal.fire({
        icon: 'success',
        title: 'Kendaraan Terdaftar!',
        html: response,
      });
    });
  });
});

$("#btn-load").click(function(){
  document.location.reload();
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[1]);
  } else {
    console.error('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});
