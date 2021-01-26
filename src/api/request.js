import axios from "axios";

export function request(config) {
  const instanse = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
  });

  return instanse(config);
}

// 登录信息
export function getLogin(data){
  return request({
    url: "/login",
    method: "post", 
    data,
  });
}

// 获取用户信息
export function getInfo(data){
  return request({
    url: '/getinfo',
    method: 'post',
    data
  })
}

// overview 数目总览
export function overview() {
  return request({
    url: "/overview",
  });
}

// 全部学生信息
export function selectallstudent(page) {
  return request({
    url: "/select/allstudent/" + page,
  });
}
// 姓名查找
export function selectStuName(name, page) {
  return request({
    url: "/select/" + name + "/page/" + page,
  });
}

// 学号查找
export function selectStuid(stuid, page) {
  return request({
    url: "/selectid/" + stuid + "/page/" + page,
  });
}

// 学号查看违纪
export function selectPunish(stuid) {
  return request({
    url: "/selcetpunish/" + stuid,
  });
}

// 学号查看获奖
export function selectReward(stuid) {
  return request({
    url: "/selcetreward/" + stuid,
  });
}

// 查看班级人数
export function selectClassNuber() {
  return request({
    url: "/getclassnum",
  });
}

// 获取各省人数
export function selectProvince() {
  return request({
    url: "/getnative",
  });
}

// 获取奖励获取情况人数
export function selectRewardCount() {
  return request({
    url: "/getreward",
  });
}

// 获取处罚情况人数
export function selectPunishCount() {
  return request({
    url: "/getpunish",
  });
}

// 学籍改动情况
export function selectStatusChange() {
  return request({
    url: "/getchange",
  });
}

// 各班高数平均分
export function selectGradeAvg() {
  return request({
    url: "/getgradeavg",
  });
}

// 请求某学号是否已经存在
export function isExit(stuid) {
  return request({
    url: "/isexist/" + stuid,
  });
}

/**
 * stuStatus
 */
// 查找全部学生信息加学籍信息
export function selectallstudentstatus(page) {
  return request({
    url: "/select/allstudentstatus/" + page,
  });
}

// 提交修改学生信息
export function updateStuInfo(data){
  return request({
    url: '/update',
    method: 'post',
    data,
  })
}

// 提交修改
export function deleteStu(data){
  return request({
    url: '/delete',
    method: 'post',
    data,
  })
}
/**
 * admin页面
 */

// 查找admin
export function admin(){
  return request({
    url: '/admin'
  })
}
