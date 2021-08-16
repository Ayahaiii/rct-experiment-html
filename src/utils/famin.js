;;(function fam(arr){
    arr.forEach(item => {
        if (item.sex === 1) {
          // 'status'为属性名，'非活动'为修改后的内容
          this.$set(item, "sex", "男");
        } else if (item.sex === 2) {
          this.$set(item, "sex", "女");
        }
        if (item.familyStatus === 1) {
          this.$set(item, "familyStatus", "正常");
        }else if (item.familyStatus === 2) {
          this.$set(item, "familyStatus", "单亲");
        }else if (item.familyStatus === 3) {
          this.$set(item, "familyStatus", "孤儿");
        }
    
        if (item.ifAgree=== 1) {
          this.$set(item, "ifAgree", "是");
        }else if (item.ifAgree=== 2) {
          this.$set(item, "ifAgree", "否");
        }
      });
      return arr
})()