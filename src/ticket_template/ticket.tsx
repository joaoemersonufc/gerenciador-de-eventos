
export const ticket = (
  pdfWindow: Window,
  destination: string,
) => {

  function handleLoad() {
    setTimeout(() => {
      pdfWindow.print();
      pdfWindow.close();
    }, 1000)
  }

  function detect(URL: string) {
    const image = new Image();
    image.src = URL;
    image.onload = handleLoad;
    return URL;
  }

  function reduceWord(word: string) {
    if (word.length > 30) {
      return `${word.substring(0, 25)}...`
    }
    return word;
  }

  const finalURL =
    `https://chart.googleapis.com/chart?cht=qr&chl=${destination}&chs=160x160&chld=L|0`;

  const current = new Date();
  const cDate = `${current.getDate()}/${current.getMonth() + 1 < 10 ? `0${current.getMonth() + 1}` : current.getMonth() + 1}/${current.getFullYear()}`;
  const cTime = `${current.getHours()}:${current.getMinutes() < 10 ? `0${current.getMinutes()}` : current.getMinutes()}`;
  const dateTime = `${cDate} ${cTime.substring(0, 5)}`;

  return ` <body class="divToPrint" style="overflow: hidden; font-family:  'Inter', sans-serif; font-weight: bold; max-width: 763.94px; max-height: 564.54px">
  <div style="width: 763.94px; height: 564.54px">
    <div class="container" style="padding-left: 40px; padding-right: 40px;">
      <div class='destination-name' style="display: flex; flex-flow: row; height: 120px">
        <div class='header' style="border-top: 2px solid #000; border-left: 2px solid #000; height: 120px; width: 65%">
          <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400">Destination name</h3>
          <div style="margin-left: 20px; margin-right: 20px; font-size: 30px; word-break: break-all; max-width: 400px">${reduceWord(destination)}</div>
        </div>
        <div class='header' style="border-top: 2px solid #000;border-right: 2px solid #000;border-left: 2px solid #000; height: 120px;  width: 40%">
          <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400">Departure</h3>
        </div>
        <div style="contain: content; display: flex; align-self: center; justify-content: center;">
          <img class='qr-code' style="width: 98px; height: 99px; padding-left: 17px;" src=${detect(finalURL)} alt="qrcode" />
        </div>
      </div>
      <div class='label' style="border-top: 2px solid #000; border-left: 2px solid #000; border-right: 2px solid #000; width: 100%; height: 195px;">
        <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400">Label</h3>
        <div class='destination-name' style="display: flex; flex-flow: row; justify-content: space-between; width: 100%; height: 142px">
          <div style="display: flex; flex-flow: column">
            <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400">Aggregation Code</h3>
          </div>
          <div style="display: flex; flex-flow: column">
            <h3 style="display: flex; padding-right: 45px; margin-top: 5px; font-size: 12px; font-weight: 400">Number of items</h3>
          </div>
        </div>
      </div>
      <div class='aggregation-type' style="display: flex; flex-flow: row; width: 100%">
        <div class='header' style=" border-left: 2px solid #000; border-bottom: 2px solid #000; height: 144px; width: 20%; min-width: 160px; ">
          <div style="display: flex; align-items: flex-end; height: 100%">
          </div>
        </div>
        <div class='header' style="border: 2px solid #000; height: 142px; width: 57%;">
          <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400;">Aggregation Type</h3>
          <div style="height: 30px; margin-left: 20px; font-size: 15px;">
          </div>
          <h3 style="margin-left: 20px; margin-top: 5px; font-size: 12px; font-weight: 400;">Origin</h3>
          <div style="height: 51px; margin-left: 20px; font-size: 15px;">${reduceWord(origin)}</div>
        </div>
        <div style="height: 142px; margin-right: -4px; display: flex; justify-content: flex-end; border-top: 2px solid #000;border-right: 2px solid #000; border-bottom: 2px solid #000;  width: 27%;">
          <h3 style="margin-left: 20px; margin-top: 7px; font-size: 12px; width: 100%; font-weight: 400;">Internal control</h3>
          <div style="height: 236px;"></div>
        </div>
      </div>
    </div>
    <div class='footer' style="display: flex; flex-flow: row;justify-content: space-between; padding-left: 40px; padding-right: 40px; color: rgba(105, 111, 140, 1);">
      <div class='footer' style="display: flex; height: 40px;">
        <h3 style="font-size: 10px; font-weight: 400">${dateTime}</h3>
        <div style="height: 30px;"></div>
      </div>
    </div>
    </div>
  </body>`};

