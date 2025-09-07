import { format } from '@/tools/string'
import './style.styl'

export default {
  render() {
    return (
      <section>
        <h2 class='ellipsis'>page Goods</h2>
        {format('uhu')}
        <div class='row-example'>
          <ul class=''>
            <li class='col-1'>1</li>
            <li class='col-2'>2</li>
            <li class='col-3'>3</li>
            <li class='col-4'>4</li>
            <li class='col-5'>5</li>
            <li class='col-6'>6</li>
            <li class='col-7'>7</li>
            <li class='col-8'>8</li>
            <li class='col-9'>9</li>
            <li class='col-10'>10</li>
            <li class='col-11'>11</li>
            <li class='col-12'>12</li>
            <li class='col-13'>13</li>
            <li class='col-14'>14</li>
            <li class='col-15'>15</li>
            <li class='col-16'>16</li>
            <li class='col-17'>17</li>
            <li class='col-18'>18</li>
            <li class='col-19'>19</li>
            <li class='col-20'>20</li>
            <li class='col-21'>21</li>
            <li class='col-22'>22</li>
            <li class='col-23'>23</li>
            <li class='col-24'>24</li>
          </ul>
        </div>
        <ul class='row-example2'>
          <li class='col-6'></li>
          <li class='col-6'></li>
          <li class='col-6'></li>
          <li class='col-6'></li>
        </ul>
      </section>
    )
  }
}
