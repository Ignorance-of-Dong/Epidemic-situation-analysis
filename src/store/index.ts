import {observable, runInAction} from 'mobx'

class Store {


    @observable cityId = '110000'

    changeCityID = (id) => {
        if (id == '710000') return
        if (id) {
            if (this.cityId != id) {
                // console.log(id)
                runInAction(() => {
                    this.cityId = id
                })
            }
        }
    }

    chidChage = (changFn) => {
        changFn(this.cityId)
    }

}

export default new Store()