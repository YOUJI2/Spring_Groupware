var SettingApiDetailMainPage;
SettingApiDetailMainPage = Vue.component("setting-api-detail-main-page", async function (resolve) {
    resolve({
        "template": (await axios.get("/vue/page/setting/api/main-detail.html")).data,
        "data": function () {
            return {
                "api_detail": {
                    "panels": {
                        "list": [0]
                    },
                },
                "apiMethodList" : [
                    "POST","GET", "PUT" ,"DELETE" , "ALL"
                ],
                "detailData" : {
                    "id" : null,
                    "url" : null,
                    "method" : null,
                    "name" : null,
                    "description" : null,
                    "createdDate" : null,
                    "lastModifiedDate" : null,
                },

            };
        },
        "watch": {
        },
        "methods": {

            "setApiDeatil": async function (queryId) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    Promise.resolve()
                        .then(function () {
                            return  metaGroupware.api.common.api.getApi(queryId);
                        })
                        .then(function (response) {
                            self.detailData = response.data;
                        })
                        .then(function () { resolve(); });
                });
            },

            "registerNewApi" : async function () {
                var self = this;
                if(self.detailData.url == null || self.detailData.url == "")
                {
                    await metaGroupware.alert("API URL을 반드시 입력하세요.");
                    return;
                }
                if(self.detailData.method == null || self.detailData.method == "")
                {
                    await metaGroupware.alert("API 종류을 반드시 입력하세요.");
                    return;
                }
                if(self.detailData.name == null || self.detailData.name == "")
                {
                    await metaGroupware.alert("API 명을 반드시 입력하세요.");
                    return;
                }

                if(self.detailData.description == null || self.detailData.description == "")
                {
                    await metaGroupware.alert("설명을 반드시 입력하세요.");
                    return;
                }


                if (await metaGroupware.confirm("저장 하시겠습니까?")) {

                    var params = {
                            "url" : self.detailData.url,
                            "method" : self.detailData.method,
                            "name" : self.detailData.name,
                            "description" : self.detailData.description,
                    };

                    new Promise(function (resolve, reject) {
                        Promise.resolve()
                            .then(function () {
                                return metaGroupware.api.common.api.createApi(params);
                            })
                            .then(function () { resolve(); });
                    });
                    await metaGroupware.alert('저장에 성공했습니다.');
                    this.$router.push({
                        "path": "/settings/apis"
                    });
                }
            },
            "updateApi" : async function () {
                var self = this;
                if(self.detailData.url == null || self.detailData.url == "")
                {
                	metaGroupware.alert("API URL을 반드시 입력하세요.");
                    return;
                }
                if(self.detailData.method == null || self.detailData.method == "")
                {
                	metaGroupware.alert("API 종류을 반드시 입력하세요.");
                    return;
                }
                if(self.detailData.name == null || self.detailData.name == "")
                {
                	metaGroupware.alert("API 명을 반드시 입력하세요.");
                    return;
                }

                if(self.detailData.description == null || self.detailData.description == "")
                {
                	metaGroupware.alert("설명을 반드시 입력하세요.");
                    return;
                }


                if (await metaGroupware.confirm("수정 하시겠습니까?")) {

                    var params = {
                            "id" : self.detailData.id,
                            "url" : self.detailData.url,
                            "method" : self.detailData.method,
                            "name" : self.detailData.name,
                            "description" : self.detailData.description,
                    };

                    new Promise(function (resolve, reject) {
                        Promise.resolve()
                            .then(function () {
                                return metaGroupware.api.common.api.modifyApi(params.id , params);
                            })
                            .then(function () { resolve(); });
                    });
                    await metaGroupware.alert('수정에 성공했습니다.');
                    this.$router.push({
                        "path": "/settings/apis",
                    });
                }
            },

        },


        "mounted": function () {
            var queryId = this.$route.query.id;
            if(queryId != undefined && queryId!= null)
            {
                Promise.resolve()
                    .then(this.setApiDeatil(queryId),
                        );

            }
        },
    });
});