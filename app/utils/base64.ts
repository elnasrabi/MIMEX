// const downloadFile= async(data:any,name:any) => {
//     try {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//          let pdfLocation = dirs.DownloadDir + '/' + name;
//          const Buffer = require("buffer").Buffer;
//          var encoded = new Buffer(data).toString("base64");
//          RNFetchBlob.fs.writeFile(pdfLocation, encoded, 'base64');
//          Alert.alert('Saved!', 'Saved in '+pdfLocation);
 
//         } else {
//           Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
//         }
//       } catch (err) {
//         console.warn(err);
//       } 
//   }