var _common = {
  stripHtml(html: string) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },
  RandomNum(start: number, end: number) {
    return parseInt((start + Math.random() * (end - start)).toFixed(0));
  },
  RandomDate(start: number, end: number, startHour: number, endHour: number) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
  },
  secondFormatter(sec: number) {
    const date = new Date("0000-01-01");
    date.setSeconds(sec); // specify value for SECONDS here
    return date.toISOString().slice(11, 19).substring(3);
  },
  numFormatter(num: number, digits: number) {
    const si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  },
  getDataAsync<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";

      //xhr.setRequestHeader("user-agent", "Mozilla/4.0 MDN Example");
      xhr.setRequestHeader("content-type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response as T);
          } else {
            console.log("xhr.statusText", xhr.statusText);
            reject(new Error(xhr.statusText));
          }
        }
      };

      xhr.onerror = (err) => {
        console.log("xhr.onerror", err);
        reject(new Error("Network error"));
      };

      xhr.send();
    });
  },
  apiAsync<T>(method: string, data: object, url: string): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: method, // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        if (!response.ok) {
          // Response error (e.g., 4xx, 5xx)
          reject(new Error(`HTTP error! Status: ${response.status}`));
          return;
        }

        try {
          const respData = await response.json();
          resolve(respData as T);
        } catch (jsonError) {
          // JSON parsing error
          reject(
            new Error(
              "Failed to parse response JSON: " + (jsonError as Error).message
            )
          );
        }
      } catch (fetchError) {
        // Fetch error
        reject(new Error("Fetch error: " + (fetchError as Error).message));
      }
    });
  },
  getDataWithAuthorizationAsync<T>(
    method: string,
    token: string,
    url: string
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.responseType = "json";

      //xhr.setRequestHeader("user-agent", "Mozilla/4.0 MDN Example");
      xhr.setRequestHeader("Authorization", token);
      xhr.setRequestHeader("content-type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response as T);
          } else {
            console.log("xhr.statusText", xhr.statusText);
            reject(new Error(xhr.statusText));
          }
        }
      };

      xhr.onerror = (err) => {
        console.log("xhr.onerror", err);
        reject(new Error("Network error"));
      };

      xhr.send();
    });
  },
  dateFormatter(date: Date, fmt: string): string {
    if (typeof fmt !== "undefined") {
      var arrFmt = ["en", "zh-tw"];
      if (arrFmt.includes(fmt) == false) {
        fmt = "en";
      }
    }
    function pad(num: number): string {
      return (num < 10 ? "0" : "") + num;
    }
    var y = date.getFullYear();
    var rm = date.getMonth() + 1;
    var m = pad(rm);
    var rd = date.getDate();
    var d = pad(rd);
    var rh = date.getHours();
    var hh = pad(rh);
    var rm = date.getMinutes();
    var mm = pad(rm);

    if (fmt == "zh-tw") {
      y = y - 1911;
      hh = (rh > 12 ? "上午 " : "下午 ") + hh;
      return `民國${y}年${m}月${d}日 ${hh}點${mm}分`;
    }

    return `${y}-${m}-${d} ${hh}:${mm}`;
  },
  doRetryAsync(fn: Function, times: number, interval: number) {
    let attempts = 0;

    const executeFunction = async (resolve: Function, reject: Function) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        attempts++;
        if (attempts < times) {
          setTimeout(() => {
            executeFunction(resolve, reject);
          }, interval);
        } else {
          reject(error);
        }
      }
    };

    return new Promise((resolve, reject) => {
      executeFunction(resolve, reject);
    });
  },
  hexEncode(rawString: string): string {
    var hex, i;

    var result = "";
    for (i = 0; i < rawString.length; i++) {
      hex = rawString.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }
    return result;
  },
  hexDecode(hexString: string): string {
    var j;
    var hexes = hexString.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
  },
};

var _qtls = {
  getFirstUnanswerQuest(answer: []) {
    return answer.reduce((previous: any, current: any) => {
      if (
        current.status === 0 &&
        (previous === null || current.idx < previous.idx)
      ) {
        return current;
      }
      return previous;
    }, null);
  },
  clearUIQuest() {
    const questRefId = document.getElementById("questRefId") as HTMLElement;
    while (true) {
      const element = questRefId.querySelector("div.w");
      if (!element) {
        break;
      }
      questRefId.removeChild(element);
    }
  },
  genUIQuest(
    qQuest: string,
    qWord: string,
    qAnswer: boolean,
    qScore: number,
    questRR: HTMLElement,
    inputRR: HTMLElement
  ) {
    const arrQuest = qQuest.split(" ");
    arrQuest.forEach((word) => {
      if (word === qWord || word === qWord + "." || word === qWord + "s") {
        if (qAnswer) {
          const wb = document.createElement("div");
          wb.textContent = "";
          wb.setAttribute("data-word", _common.hexEncode(word));
          wb.setAttribute("class", "w w-back");
          wb.setAttribute("id", "wbackref");
          questRR.appendChild(wb);
          const wbackref = document.getElementById("wbackref") as HTMLElement;
          inputRR.style.left = `${wbackref.offsetLeft}px`;
          inputRR.style.top = `${wbackref.offsetTop}px`;
        } else {
          const w = document.createElement("div");
          w.textContent = word;
          w.setAttribute("class", "w");
          w.style["color"] = "#ea868f";
          if (qScore >= 100) w.style["color"] = "#75b798";
          if (qScore < 100 && qScore > 0) w.style["color"] = "#ffc107";
          questRR.appendChild(w);
        }
      } else {
        const w = document.createElement("div");
        w.textContent = word;
        w.setAttribute("class", "w");
        questRR.appendChild(w);
      }
    });
  },
  endUIQuest(score: number, inputRR: HTMLElement) {
    inputRR.style.left = `-1000px`;
    inputRR.style.top = `-1000px`;
    const wbackref = document.getElementById("wbackref") as HTMLElement;
    wbackref.classList.remove("w-back");

    wbackref.style["color"] = "#ea868f";
    if (score >= 100) wbackref.style["color"] = "#75b798";
    if (score < 100 && score > 0) wbackref.style["color"] = "#ffc107";
    const word = _common.hexDecode(
      wbackref.getAttribute("data-word") as string
    );
    wbackref.innerText = word;
  },
  backspaceUIInput(
    evt: KeyboardEvent,
    inputRR: HTMLElement,
    fn: Function
  ): boolean {
    if (evt.key === "Backspace") {
      var wbackref = document.getElementById("wbackref") as HTMLDivElement;
      if (wbackref.innerText.length === 0) return false;
      if (wbackref.lastChild) wbackref.removeChild(wbackref.lastChild);
      fn(wbackref.innerText);
      inputRR.style["left"] = `${
        wbackref.offsetLeft + 0 + wbackref.innerText.length * 25
      }px`;
      inputRR.style["top"] = `${wbackref.offsetTop}px`;
      return true;
    }
    return false;
  },
  typingUIInput(
    evt: KeyboardEvent,
    inputRR: HTMLElement,
    fn: Function
  ): boolean {
    if (evt.key.length != 1) return false;
    if (
      (evt.key >= "0" && evt.key <= "9") ||
      (evt.key >= "A" && evt.key <= "Z") ||
      (evt.key >= "a" && evt.key <= "z") ||
      (evt.key >= "0" && evt.key <= "9")
    ) {
      const wbackref = document.getElementById("wbackref") as HTMLDivElement;
      const wb0 = document.createElement("div");
      wb0.textContent = ToDBC(evt.key);
      wb0.setAttribute("class", "w0");
      wbackref.appendChild(wb0);

      fn(wbackref.innerText);

      inputRR.style["left"] = `${
        wbackref.offsetLeft + 0 + wbackref.innerText.length * 25
      }px`;
      inputRR.style["top"] = `${wbackref.offsetTop}px`;
      return true;
    }
    return false;
  },
  enterUIInput(
    evt: KeyboardEvent,
    inputRR: HTMLElement,
    qWord: string,
    qAnswer: string,
    fn: Function
  ): boolean {
    if (evt.key === "Enter") {
      const wbackref = document.querySelector("#wbackref") as any;
      const winputref = document.querySelector("input.w-input") as any;
      const qWordCleaned = qWord
        .replace(/[^\w\s]/g, "")
        .toLowerCase()
        .trim();
      const qAnswerCleaned = ToCDB(qAnswer).toLowerCase().trim();

      if (qWordCleaned != qAnswerCleaned) {
        // 隱藏 wbackref 並創建 temporaryDisplay 元素
        wbackref.style.display = "none";
        const temporaryDisplay = document.createElement("div");
        temporaryDisplay.classList.add("w", "w-back");
        temporaryDisplay.style.color = "#ea868f";
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < qWordCleaned.length; i++) {
          const charDiv = document.createElement("div");
          charDiv.classList.add("w");
          charDiv.textContent = ToDBC(qWordCleaned[i]);
          fragment.appendChild(charDiv);
        }
        temporaryDisplay.appendChild(fragment);
        wbackref.parentElement?.appendChild(temporaryDisplay);

        // 隱藏 inputRR 並保存原位置
        const { left: tempLeft, top: tempTop } = inputRR.style;
        winputref.style["left"] = "-1000px";
        winputref.style["top"] = "-1000px";

        setTimeout(() => {
          // 移除 temporaryDisplay 並還原 wbackref 和 inputRR 的狀態
          temporaryDisplay.remove();
          wbackref.style.display = "";
          winputref.style.left = tempLeft;
          winputref.style.top = tempTop;
        }, 1500);
      }

      let correctChar = 0;
      for (let i = 0; i < qAnswerCleaned.length; i++) {
        if (qWordCleaned[i] === qAnswerCleaned[i]) {
          correctChar++;
        }
      }
      const score = Math.ceil((correctChar / qAnswerCleaned.length) * 100);
      if (score == 100) wbackref.style["color"] = "#ea868f";
      fn(score);

      return true;
    }
    return false;
  },
};

function ToDBC(txtstring: string) {
  var tmp = "";
  for (var i = 0; i < txtstring.length; i++) {
    if (txtstring.charCodeAt(i) == 32) {
      tmp = tmp + String.fromCharCode(12288);
    }
    if (txtstring.charCodeAt(i) < 127) {
      tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
    }
  }
  return tmp;
}

function ToCDB(str: string) {
  var tmp = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) == 12288) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
      continue;
    }
    if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}
export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      common: _common,
      qtls: _qtls,
    },
  };
});
