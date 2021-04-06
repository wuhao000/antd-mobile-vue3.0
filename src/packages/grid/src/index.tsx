import classnames from 'classnames';
import {defineComponent, isVNode, onMounted, PropType, ref, Ref} from 'vue';

import Carousel from '../../carousel';
import Flex from '../../flex';
import Icon from '../../icon';
import TouchFeedback from '../../vmc-feedback';

interface DataItem {
  icon?: string | object;
  text?: any;

  [key: string]: any;
}

export default defineComponent({
  name: 'Grid',
  props: {
    /**
     * 宫格数据列表
     */
    data: {
      type: Array as PropType<Array<DataItem | undefined>>,
      default: () => {
        return [];
      }
    },
    /**
     * 是否有边框
     */
    bordered: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 列数
     */
    cols: {
      type: Number as PropType<number>,
      default: 4
    },
    carousel: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    carouselMaxRow: {
      type: Number as PropType<number>,
      default: 2
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-grid'
    },
    square: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    activeClassName: {
      type: String as PropType<string>
    },
    activeStyle: {},
    itemStyle: {
      type: Object as PropType<object>,
      default: () => {
        return {};
      }
    }
  },
  setup(props, {emit}) {
    const initialSlideWidth: Ref<number> = ref(0);


    const renderCarousel = (rowsArr: any[], pageCount: number, rowCount: number) => {
      const carouselMaxRow = props.carouselMaxRow as number;
      const pagesArr: any[] = [];
      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const pageRows: any[] = [];
        for (let ii = 0; ii < carouselMaxRow; ii++) {
          const rowIndex = pageIndex * carouselMaxRow + ii;
          if (rowIndex < rowCount) {
            pageRows.push(rowsArr[rowIndex]);
          } else {
            // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
            pageRows.push(<div key={`gridline-${rowIndex}`}/>);
          }
        }
        pagesArr.push(
          <div
            key={`pageitem-${pageIndex}`}
            class={`${props.prefixCls}-carousel-page`}
          >
            {pageRows}
          </div>
        );
      }
      return pagesArr;
    };
    const renderItem = (dataItem: DataItem | any,
                        index: number,
                        columnNum: number) => {
      let itemEl: any = null;
      if (dataItem) {
        const {icon, text} = dataItem;
        itemEl = (
          <div
            class={`${props.prefixCls}-item-inner-content column-num-${columnNum}`}
          >
            {renderIcon(icon, props.prefixCls)}
            <div class={`${props.prefixCls}-text`}>{text}</div>
          </div>
        );
      }
      return <div class={`${props.prefixCls}-item-content`}>{itemEl}</div>;
    };
    const getRows = (rowCount: number, dataLength: number) => {
      const {
        cols,
        prefixCls,
        activeStyle,
        activeClassName,
        itemStyle
      } = props;
      const rowsArr: any[] = [];
      const rowWidth = `${100 / cols}%`;
      const colStyle = {
        width: rowWidth,
        ...itemStyle
      };
      for (let i = 0; i < rowCount; i++) {
        const rowArr: any[] = [];
        for (let j = 0; j < cols; j++) {
          const dataIndex = i * cols + j;
          let itemEl;
          if (dataIndex < dataLength) {
            const el = props.data && props.data[dataIndex];
            const TouchFeedback2 = TouchFeedback as any;
            itemEl = (
              <TouchFeedback2
                key={`griditem-${dataIndex}`}
                activeClassName={
                  activeClassName ? activeClassName : `${prefixCls}-item-active`}
                activeStyle={activeStyle}
              >
                <Flex.Item
                  class={`${prefixCls}-item`}
                  nativeOn={
                    {
                      click: () => {
                        emit('click', el, dataIndex);
                      }
                    }
                  }
                  style={colStyle}
                >
                  {renderItem(el, dataIndex, cols)}
                </Flex.Item>
              </TouchFeedback2>
            );
          } else {
            itemEl = (
              <Flex.Item
                key={`griditem-${dataIndex}`}
                class={`${prefixCls}-item ${prefixCls}-null-item`}
                style={colStyle}
              />
            );
          }
          rowArr.push(itemEl);
        }
        rowsArr.push(
          <Flex justify="center" align="stretch" key={`gridline-${i}`}>
            {rowArr}
          </Flex>
        );
      }
      return rowsArr;
    };
    const renderIcon = (icon: any, prefixCls: string) => {
      if (typeof icon === 'string') {
        if (icon.startsWith('http://') || icon.startsWith('https://')) {
          return <img class={`${prefixCls}-icon`}
                      src={icon} alt=""/>;
        } else {
          return <Icon type={icon} size="lg"/>;
        }
      } else if (typeof icon === 'object') {
        if (isVNode(icon)) {
          return icon;
        }
        return <Icon {...{icon}}/>;
      }
    };
    onMounted(() => {
      initialSlideWidth.value = document.documentElement.clientWidth;
    });

    return {
      renderItem,
      initialSlideWidth,
      getRows,
      renderCarousel
    };
  },
  render() {
    const {
      prefixCls,
      data,
      bordered,
      carousel,
      square,
      activeStyle,
      cols,
      carouselMaxRow,
      renderItem,
      activeClassName,
      ...restPropsForCarousel
    } = this;
    const initialSlideWidth = this.initialSlideWidth;
    const dataLength = (data && data.length) || 0;
    let rowCount = Math.ceil(dataLength / cols);
    let rowsArr;
    let renderEl;
    if (carousel) {
      if (initialSlideWidth < 0) {
        // carousel  server render. because carousel dependes on document
        return null;
      }
      if (rowCount % carouselMaxRow !== 0) {
        rowCount = rowCount + carouselMaxRow - rowCount % carouselMaxRow;
      }
      const pageCount = Math.ceil(rowCount / carouselMaxRow);
      rowsArr = this.getRows(rowCount, dataLength);
      let carouselProps = {};
      if (pageCount <= 1) {
        carouselProps = {
          dots: false,
          dragging: false,
          swiping: false
        };
      }
      renderEl = (
        <Carousel
          initialSlideWidth={initialSlideWidth}
          {...restPropsForCarousel}
          {...carouselProps}>
          {this.renderCarousel(rowsArr, pageCount, rowCount)}
        </Carousel>
      );
    } else {
      renderEl = this.getRows(rowCount, dataLength);
    }
    const cls = classnames(prefixCls, {
      [`${prefixCls}-square`]: square,
      [`${prefixCls}-line`]: bordered,
      [`${prefixCls}-carousel`]: carousel
    });
    return <div class={cls}>{renderEl}</div>;
  }
});
