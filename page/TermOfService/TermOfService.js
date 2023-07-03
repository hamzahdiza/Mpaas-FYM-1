Page({
  data: {
    syarat_dan_ketentuan : [
      "Pendaftaran Pengguna: Pengguna harus mendaftar dengan akun yang valid untuk menggunakan aplikasi ini. Mereka harus memberikan informasi pribadi yang akurat dan tidak boleh mendaftar dengan akun palsu atau mengambil identitas orang lain.",
      "Penggunaan yang Wajar: Pengguna harus menggunakan aplikasi ini secara wajar dan sesuai dengan tujuan yang ditentukan. Mereka tidak diperbolehkan menggunakan aplikasi ini untuk tujuan yang melanggar hukum, merugikan orang lain, atau melanggar hak kekayaan intelektual.",
      "Kebijakan Privasi: Pengguna harus menyetujui kebijakan privasi aplikasi ini dan memberikan izin untuk mengumpulkan, menyimpan, dan memproses data pribadi mereka sesuai dengan kebijakan tersebut. Mereka juga harus menyadari jenis informasi yang dikumpulkan dan bagaimana informasi tersebut digunakan.",
      "Keamanan Akun: Pengguna bertanggung jawab penuh untuk menjaga keamanan akun mereka. Mereka harus merahasiakan kata sandi mereka dan tidak boleh memberikan akses ke akun mereka kepada pihak ketiga.",
      "Pembatasan Usia: Aplikasi ini mungkin memiliki batasan usia tertentu. Pengguna harus memastikan bahwa mereka memenuhi persyaratan usia sebelum menggunakan aplikasi ini.",
      "Pelanggaran Hak Kekayaan Intelektual: Pengguna tidak diperbolehkan menggunakan atau menyebarluaskan materi yang melanggar hak kekayaan intelektual, termasuk tetapi tidak terbatas pada hak cipta, merek dagang, atau paten.",
      "Tanggung Jawab Pengguna: Pengguna bertanggung jawab penuh atas segala kegiatan yang dilakukan melalui akun mereka. Mereka harus mematuhi hukum yang berlaku dan tidak boleh menggunakan aplikasi ini untuk tujuan ilegal atau merugikan orang lain.",
      "Perubahan dan Pembaruan: Pengguna harus setuju bahwa pengembang aplikasi berhak melakukan perubahan, pembaruan, atau peningkatan pada aplikasi ini sesuai dengan kebijakan dan kepentingan mereka. Pengguna mungkin akan diberi tahu tentang perubahan tersebut melalui pemberitahuan di aplikasi atau melalui email.",
      "Tanggung Jawab Pengembang: Meskipun pengembang berusaha untuk menyediakan aplikasi yang stabil dan aman, mereka tidak dapat menjamin bahwa aplikasi ini bebas dari cacat atau masalah. Pengguna menggunakan aplikasi ini dengan risiko mereka sendiri.",
      "Pembatasan Tanggung Jawab: Pengembang tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan atau ketidakmampuan menggunakan aplikasi ini. Pengguna harus menggunakan aplikasi ini dengan bijak dan bertanggung jawab atas tindakan mereka sendiri."
    ],
    isScrolledToBottom: false,
    checked: false
  },
  async onLoad() {
    const termsAccepted = my.getStorageSync({
      key: 'termsAccepted',
    }).data;
    
    my.hideBackHome();

    if (termsAccepted) {
      my.switchTab({
        url: '/page/tabBarUs/NewsTabBar/NewsTabBar'
      });
    }
  },

  checkboxChange(e) {
    this.setData({
      checked: e.detail.value,
    });
    console.log(this.data.checked);
  },

  activateCheckbox() {
    this.setData({
      isScrolledToBottom: true
    });
  },

  acceptTerms() {
    if (this.data.checked) {
      my.setStorageSync({
        key: "termsAccepted",
        data: true,
      });
      my.switchTab({
        url: "/page/tabBarUs/NewsTabBar/NewsTabBar",
      });
    } else {
      my.showToast({
        type: 'fail',
        content: "Anda harus menyetujui Syarat dan Ketentuan untuk melanjutkan.",
        duration: 2000,
      });
    }
  },
});
