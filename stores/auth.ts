import { defineStore } from "pinia";

export interface IQuest {
  quest: {
    /* Structure of your quest data */
  }[];
  answer: {
    status: number;
    /* ... other properties */
  }[];
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    IsLogin: false,
    IsAdmin: false,
    OwnIds: [] as any[],
    UserName: "UNKNOWN",

    showslot: true,
    showlogin: false,
    showforgetpassword: false,
    showregister: false,
    showprevbtn: false,
    shownextbtn: false,

    vArrQuest: [],
    vTotalQuest: 0,
    vCurrentQuest: 0,
    vTimesQuest: 0,
    vRemainQuest: 0,
    vIdx: -1,
    vIdx2: -1,

    evtOnPass: false,
    evtOnCorrect: false,
  }),
  actions: {
    setAuthentication(
      token: string,
      IsLogin: boolean,
      IsAdmin: boolean,
      OwnIds: any[],
      UserName: string
    ) {
      this.token = token;
      this.IsLogin = IsLogin;
      this.IsAdmin = IsAdmin;
      this.OwnIds = OwnIds;
      this.UserName = UserName;
    },
    setQuest(result: IQuest) {
      this.vTotalQuest = result.quest.length;
      this.vCurrentQuest = result.answer.filter(
        (obj) => obj.status === 1
      ).length;
      this.vTimesQuest = 15;
    },
  },
});
