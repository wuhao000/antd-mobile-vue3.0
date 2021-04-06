import F2 from '@antv/f2';
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  Ref,
  watch
} from 'vue';

export default defineComponent({
  install: null,
  Area: null,
  Axis: null,
  Bar: null,
  Guide: null,
  Legend: null,
  Line: null,
  Pie: null,
  Point: null,
  Scale: null,
  Tooltip: null,
  name: 'VChart',
  props: {
    prefixCls: {type: String as PropType<string>, default: 'mchart-'},
    width: Number as PropType<number>,
    height: Number as PropType<number>,
    backgroundColor: {
      type: String as PropType<string>,
      default: '#fff'
    },
    data: {
      type: Array as PropType<any[]>
    },
    tooltip: {
      type: Object as PropType<any>
    },
    shape: {
      type: String as PropType<string>,
      default: 'line'
    },
    preventRender: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    preventDefault: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots, attrs}) {
    const prefixCls: Ref<string> = ref(null);
    const width: Ref<number> = ref(null);
    const height: Ref<number> = ref(null);
    const backgroundColor: Ref<string> = ref(null);
    const data: Ref<any[]> = ref(null);
    const tooltip: Ref<any> = ref(null);
    const shape: Ref<string> = ref(null);
    const preventRender: Ref<boolean> = ref(null);
    const preventDefault: Ref<boolean> = ref(null);
    const xField = ref('');
    const yField = ref('');
    const hasPoint = ref(false);
    const pointStyle = reactive({});
    const guideTags = ref([]);
    const areaOptions = ref(null);
    const lineOptions = ref(null);
    const tooltipOptions = ref(null);
    const legendOptions = ref(null);
    const barOptions = ref(null);
    const pieOptions = ref(null);
    const guideOptions = ref(null);
    const pointOptions = ref(null);
    const xFieldOptions = reactive({});
    const yFieldOptions = reactive({});
    const guides = ref([]);
    const seriesField = ref('');
    const xAxisOptions = ref(null);
    const yAxisOptions = ref(null);
    const autoAlignXAxis = ref(undefined);
    const chart: Ref<any> = ref(null);
    const $devicePixelRatio: Ref<number> = ref(null);
    const barOption: Ref<any> = ref(null);
    const wrapperRef = ref(null);
    const chartRef = ref(null);
    watch(() => props.data, () => {
      changeData(data.value);
    });
    watch(() => props.height, () => {
      rerender();
    });
    watch(() => props.width, () => {
      rerender();
    });
    const currentData = computed(() => {
      if (pieOptions.value) {
        return data.value.slice().map(item => {
          item.a = '1';
          return item;
        });
      }
      return data.value;
    });
    const currentXFieldOptions = computed(() => {
      const defaultOptions: any = {
        tickCount: 5
      };
      if (!barOptions.value) {
        defaultOptions.range = [0, 1];
      } else {
        defaultOptions.tickCount = 0;
      }
      // auto detect if is timeCat
      if (!xFieldOptions) {
        if (/\d{4}-\d{2}-\d{2}/.test(data.value[0][xField.value])) {
          return Object.assign({}, defaultOptions, {
            type: 'timeCat',
            tickCount: 3
          });
        } else {
          return defaultOptions;
        }
      }

      return Object.assign({}, defaultOptions, xFieldOptions);
    });
    const currentYFieldOptions = computed(() => {
      const defaultOptions = {
        tickCount: 5
      };
      if (!yFieldOptions) {
        return defaultOptions;
      }

      return Object.assign({}, defaultOptions, yFieldOptions);
    });
    const onTouchstart = (e) => {
      preventDefault.value && e.preventDefault();
    };
    const set = (name, options) => {
      this[`${name}Options`] = options;
    };
    const changeData = (data) => {
      chart.value && chart.value.changeData(data);
    };
    const setField = (axis, item) => {
      if (axis === 'x') {
        xField.value = item;
      } else if (axis === 'y') {
        yField.value = item;
      }
    };
    const repaint = () => {
      chart.value.repaint();
    };
    const rerender = () => {
      destroy();
      renderComponent();
    };
    const destroy = () => {
      chart.value && chart.value.destroy();
    };
    const addGuide = options => {
      guides.value.push(options);
    };
    const setScale = options => {
      if (options.x) {
        Object.assign(xFieldOptions, options.x);
      }
      if (options.y) {
        Object.assign(yFieldOptions, options.y);
      }
    };
    const setAxis = options => {
      if (options.x) {
        xAxisOptions.value = options;
        if (typeof options.autoAlign !== 'undefined') {
          autoAlignXAxis.value = options.autoAlign;
        }
      }
      if (options.y) {
        yAxisOptions.value = options;
      }
    };
    const buildColor = (c) => {
      let color = c || '';
      if (Array.isArray(c) && Array.isArray(c[0])) {
        const ctx = chartRef.value.getContext('2d');
        color = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
        c.forEach(item => {
          color.addColorStop(item[0], item[1]);
        });
      }
      return color;
    };
    const setPie = (options = {}) => {
      pieOptions.value = options;
    };
    const setBar = (options = {}) => {
      barOptions.value = options;
    };
    const setLegend = (options) => {
      legendOptions.value = options;
    };
    const setTooltip = (options) => {
      tooltipOptions.value = options;
    };
    const setArea = (options) => {
      areaOptions.value = options;
    };
    const setGuide = (options) => {
      guideOptions.value = options;
    };
    const setLine = (options) => {
      lineOptions.value = options;
    };
    const setPoint = (options) => {
      pointOptions.value = options;
    };
    const buildPosition = () => {
      return `${xField.value}*${yField.value}`;
    };
    const getFields = () => {
      if (xField.value && yField.value) {
        return;
      }

      if (data.value && data.value.length) {
        const keys = Object.keys(data.value[0]);
        if (keys.length >= 2) {
          let indexes = [0, 1];
          const type1 = typeof data.value[0][keys[0]];
          const type2 = typeof data.value[0][keys[1]];
          if (type1 === 'number' && type2 !== 'number') {
            indexes = [1, 0];
          } else if (type1 === 'string' && type2 === 'string' && keys[2] === 'value') {
            indexes = [0, 2];
          }
          xField.value = keys[indexes[0]];
          yField.value = keys[indexes[1]];
        }
      }
    };
    const renderComponent = () => {
      let copyAutoAlignXAxis = autoAlignXAxis.value;
      if (barOptions.value) {
        copyAutoAlignXAxis = false;
      }
      if (typeof copyAutoAlignXAxis === 'undefined') {
        copyAutoAlignXAxis = true;
      }
      const parentWidth = (wrapperRef.value as HTMLDivElement).clientWidth;
      const parentHeight = (wrapperRef.value as HTMLDivElement).clientHeight;
      const localChart = new F2.Chart({
        el: chartRef.value,
        width: width.value || parentWidth,
        height: height.value ? height.value : (parentWidth > parentHeight ? (parentHeight - 34) : parentWidth * 0.707),
        pixelRatio: $devicePixelRatio.value || window.devicePixelRatio,
        ...attrs
      });
      if (preventRender.value) {
        emit('on-render', {chart: localChart});
        return;
      }
      if (!data.value || !data.value.length) {
        return;
      }
      localChart.source(currentData.value);
      getFields();
      localChart.scale(xField.value, currentXFieldOptions.value);
      localChart.scale(yField.value, currentYFieldOptions.value);
      renderLegend(localChart);
      renderTooltip(localChart);
      setAutoAlignXAxis(localChart, copyAutoAlignXAxis);
      renderLine(localChart);
      renderGuide(localChart);
      renderArea(localChart);
      renderBar(localChart);
      renderAxis(localChart);
      renderPie(localChart);
      renderPoint(localChart);
      localChart.render();
      chart.value = localChart;
    };
    const renderTooltip = (chart) => {
      if (tooltipOptions.value) {
        if (barOptions.value) {
          tooltipOptions.value.showCrosshairs = false;
        }
        if (!tooltipOptions.value.disabled) {
          // handle show-value-in-legend
          if (tooltipOptions.value.showValueInLegend) {
            const customTooltip = {
              custom: true, // 自定义 tooltip 内容框
              onChange: (obj) => {
                const legend = chart.value.get('legendController').legends.top[0];
                const tooltipItems = obj.items;
                const legendItems = legend.items;
                const map = {};
                legendItems.map(item => {
                  map[item.name] = JSON.parse(JSON.stringify(item));
                });
                tooltipItems.map(item => {
                  const {name, value} = item;
                  if (map[name]) {
                    map[name].value = value;
                  }
                });
                legend.setItems(Object.values(map));
              },
              onHide: () => {
                const VChart = chart.value;
                const legend = VChart.get('legendController').legends.top[0];
                legend.setItems(VChart.getLegendItems().type);
              }
            };
            tooltipOptions.value = {
              ...tooltipOptions.value,
              ...customTooltip
            };
          }
          chart.tooltip(tooltipOptions.value);
        } else {
          chart.tooltip(false);
        }
      } else {
        chart.tooltip({
          showCrosshairs: !barOption.value
        });
      }
    };
    const renderLine = (chart: F2.Chart) => {
      if (lineOptions.value) {
        const {shape, adjust} = lineOptions.value;
        const seriesField = lineOptions.value.seriesField || '';
        const colors = buildColor(lineOptions.value.colors);
        const rs = chart.line().position(buildPosition()).shape(shape);

        if (!seriesField && colors) {
          rs.color(colors);
        }
        if (seriesField) {
          if (colors && colors.length) {
            rs.color(seriesField, colors);
          } else {
            rs.color(seriesField);
          }
        }
        if (adjust) {
          rs.adjust(adjust);
        }
      }
    };
    const renderGuide = (chart: F2.Chart) => {
      if (guides.value.length) {
        guides.value.forEach(guide => {
          chart.guide()[guide.type](guide.options);
        });
      }
    };
    const renderArea = (chart: F2.Chart) => {
      if (areaOptions.value) {
        const {adjust, seriesField} = areaOptions.value;
        const color = buildColor(areaOptions.value.colors);
        const rs = chart.area().position(buildPosition()).shape(areaOptions.value.shape || '');
        if (!seriesField && color) {
          rs.color(color);
        } else {
          rs.color(seriesField || '', color);
        }

        if (adjust) {
          rs.adjust(adjust);
        }
      }
    };
    const renderBar = (chart: F2.Chart) => {
      if (barOptions.value) {
        const {adjust, seriesField} = barOptions.value;
        const color = buildColor(barOptions.value.colors);
        if (barOptions.value.direction && barOptions.value.direction === 'horizontal') {
          chart.coord({
            transposed: true
          });
        }
        const rs = chart.interval().position(buildPosition());
        if (!seriesField && color) {
          rs.color(color);
        } else {
          rs.color(seriesField || '', color);
        }

        if (adjust) {
          rs.adjust(adjust);
        }
      }
    };
    const renderAxis = (chart: F2.Chart) => {
      if (['x', 'y'].find(axis => this[`${axis}AxisOptions`])) {
        ['x', 'y'].forEach(axis => {
          if (this[`${axis}AxisOptions`]) {
            chart.axis(this[`${axis}Field`], this[`${axis}Field`].disabled ? false : this[`${axis}AxisOptions`]);
          }
        });
      } else {
        chart.axis(false);
      }
    };
    const renderPie = (chart: F2.Chart) => {
      if (pieOptions.value) {
        chart.coord(pieOptions.value.coord, pieOptions.value);
        chart.axis(false);
        chart.interval()
            .position('a*percent')
            .color(pieOptions.value.seriesField,
                (pieOptions.value.colors && pieOptions.value.colors.length)
                    ? pieOptions.value.colors : '')
            .adjust('stack')
            .style({
              lineWidth: 1,
              stroke: '#fff',
              lineJoin: 'round',
              lineCap: 'round'
            })
            .animate({
              appear: {
                duration: 1200,
                easing: 'bounceOut'
              }
            });
      }
    };
    const renderPoint = (chart: F2.Chart) => {
      if (pointOptions.value) {
        const {seriesField} = pointOptions.value;
        const rs = chart.point().position(buildPosition()).style(pointOptions.value.styles);

        const color = buildColor(pointOptions.value.colors);
        if (!seriesField && color) {
          rs.color(color);
        } else {
          rs.color(seriesField || '', color);
        }
      }
    };
    const setAutoAlignXAxis = (chart: F2.Chart, autoAlignXAxis: any) => {
      if (autoAlignXAxis) {
        if (xAxisOptions.value) {
          chart.axis(xField.value, {
            label(text, index, total) {
              const textCfg: any = {};
              if (index === 0) {
                textCfg.textAlign = 'left';
              }
              if (index === total - 1) {
                textCfg.textAlign = 'right';
              }
              return textCfg;
            }
          });
        }
      }
    };
    const renderLegend = (chart: F2.Chart) => {
      if (legendOptions.value) {
        if (legendOptions.value.disabled) {
          chart.legend(false);
        } else {
          chart.legend(legendOptions.value);
        }
      }
    };
    onMounted(async () => {
      await nextTick();
      renderComponent();
      window.addEventListener('resize', renderComponent);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', renderComponent);
      destroy();
    });

    return {
      prefixCls,
      width,
      height,
      backgroundColor,
      data,
      tooltip,
      shape,
      preventRender,
      preventDefault,
      xField,
      yField,
      hasPoint,
      pointStyle,
      guideTags,
      areaOptions,
      lineOptions,
      tooltipOptions,
      legendOptions,
      barOptions,
      pieOptions,
      guideOptions,
      pointOptions,
      xFieldOptions,
      yFieldOptions,
      guides,
      seriesField,
      xAxisOptions,
      yAxisOptions,
      autoAlignXAxis,
      chart,
      $devicePixelRatio,
      barOption,
      currentData,
      currentXFieldOptions,
      currentYFieldOptions,
      onTouchstart,
      set,
      changeData,
      setField,
      repaint,
      rerender,
      destroy,
      addGuide,
      setScale,
      setAxis,
      buildColor,
      setPie,
      setBar,
      setLegend,
      setTooltip,
      setArea,
      setGuide,
      setLine,
      setPoint,
      buildPosition,
      getFields,
      renderComponent,
      renderTooltip,
      renderLine,
      renderGuide,
      renderArea,
      setWrapperRef(el) {
        wrapperRef.value = el;
      },
      renderBar,
      renderAxis,
      renderPie,
      renderPoint,
      setAutoAlignXAxis,
      renderLegend,
      setChartRef(el) {
        chartRef.value = el;
      }
    };
  },
  render() {
    const style = {
      backgroundColor: this.backgroundColor,
      width: `${this.width}px`,
      height: `${this.height}px`
    };
    return <div style={style}
                ref={this.setWrapperRef}
                onTouchstart={this.onTouchstart}>
      <canvas class={`${this.prefixCls}-no-select`}
              ref={this.setChartRef}/>
      {this.$slots.default?.()}
    </div>;
  }
});
