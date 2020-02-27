
import Rx, {from, Observable} from 'rxjs'
import {ajax} from 'rxjs/ajax'
import {filter, map} from 'rxjs/operators'
import { resolve } from 'path'

class Http {

    HOST = {
        default: 'http://server.ignorantscholar.cn',
        icu: 'http://api.tianapi.com'
    }
    // HOST = 'http://localhost:4000'


    private AjaxObserverable(Observable: Rx.Observable<any>) {
        return Observable.
            pipe(
                map(this.map),
                filter(this.filter)
            )
    }

    private headers = {
        // Token: sessionStorage.getItem('Token')
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    private splicingUrl(url: string, body: any): string {
        
        return ''
    }   

    get(url, body?,show?, header?) {
        let headers = {...this.headers, ...header}

        
        
        if (!show) {
            return this.AjaxObserverable(ajax.get(url, headers))
        }
        let Urls = this.splicingUrl(url, body)
        return this.AjaxObserverable(ajax.get(Urls, headers))
    }

    post(url: string, body?: any, header?) {
        let headers = {...this.headers, ...header}
        return this.AjaxObserverable(ajax.post(this.HOST.icu + url, body, headers))
    }
    
    private map(res) {
        console.log(res)
            if (res.status == 200) {
                return res.response
            }
            return {
                status: res.status,
                message: res.message
            }
        
    }
    private filter(res) {
        console.log(res)
        return res
    }
}

export default new Http()