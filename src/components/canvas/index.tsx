import React, { useMemo } from 'react';
import _ from 'lodash';
import {
  Area,
  Bar,
  Column,
  Line,
  Pie,
  Radar,
  RadarOptions,
  HeatmapOptions,
  Heatmap,
  TreemapOptions,
  Treemap,
  PieOptions,
  BarOptions,
  ColumnOptions,
  Gauge,
  GaugeOptions,
  RadialBarOptions,
  RadialBar,
  WaterfallOptions,
  Waterfall,
  Scatter,
  ScatterOptions,
} from '@antv/g2plot';
import { UseG2Plot } from '../../hooks/use-g2plot';
import { ConfigProps } from '../../types';
import styles from './index.module.less';

export const Canvas: React.FC<ConfigProps> = props => {
  const { seriesCount = 3, showAxisTitle, theme } = props;

  /** 图表数据 */
  const data = useMemo(() => {
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun'];
    const result = [];
    months.forEach(month => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          month,
          category: `分类 ${i + 1}`,
          value: Math.floor(Math.random() * 920 + 40),
        });
      }
    });
    return result;
  }, [seriesCount]);

  const barData = useMemo(() => {
    const months = [
      'Jan',
      'Feb',
      'March',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const result = [];
    months.forEach(month => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          month,
          category: `分类 ${i + 1}`,
          value: Math.floor(Math.random() * 920 + 40),
        });
      }
    });
    return result;
  }, [seriesCount]);

  /** 适用于：折线图、面积图 */
  const options1 = useMemo(() => {
    return {
      data,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      isStack: false,
      theme,
      tooltip: {
        showMarkers: undefined,
      },
      label: {},
      xAxis: { title: showAxisTitle ? {} : null },
      yAxis: { title: showAxisTitle ? {} : null },
    };
  }, [data, theme]);

  /** 适用于：柱状图 */
  const columnOptions = useMemo((): ColumnOptions => {
    return {
      data: barData,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      theme,
      label: {},
      yAxis: { title: showAxisTitle ? {} : null },
    };
  }, [barData, theme]);

  /** 适用于：条形图 */
  const barOptions = useMemo((): BarOptions => {
    return {
      data: barData,
      yField: 'month',
      xField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      theme,
      isStack: true,
      label: {},
    };
  }, [barData, theme]);

  /** 饼图数据 */
  const pieData = useMemo(() => {
    const result = [];
    for (let i = 0; i < seriesCount; i += 1) {
      result.push({
        category: `分类 ${i + 1}`,
        value: Math.floor(Math.random() * 920 + 40),
      });
    }
    return result;
  }, [seriesCount]);

  /** 适用于：饼图 */
  const pieOptions = useMemo((): PieOptions => {
    return {
      data: pieData,
      angleField: 'value',
      colorField: 'category',
      radius: 0.8,
      theme,
    };
  }, [pieData, theme]);

  /** 适用于：玉珏图 */
  const radialBarOptions = useMemo((): RadialBarOptions => {
    return {
      data: pieData,
      xField: 'category',
      colorField: 'category',
      yField: 'value',
      radius: 0.8,
      innerRadius: 0.4,
      barBackground: {
        style: { fill: theme.subColor },
      },
      theme,
    };
  }, [pieData, theme]);

  /** 雷达图数据 */
  const radarData = useMemo(() => {
    const result = [];
    const names = [
      '销售',
      '市场营销',
      '发展',
      '客户支持',
      '信息技术',
      '行政管理',
    ];
    names.forEach(name => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          name,
          category: `分类 ${i + 1}`,
          value: Math.floor(Math.random() * 20 + 140),
        });
      }
    });

    return result;
  }, [seriesCount]);

  /** 适用于：雷达图 */
  const radarOptions = useMemo((): RadarOptions => {
    return {
      data: radarData,
      xField: 'name',
      yField: 'value',
      seriesField: 'category',
      tooltip: {
        showMarkers: undefined,
      },
      theme,
    };
  }, [radarData, theme]);

  /** 适用于：色块图 */
  const heatmapOptions = useMemo((): HeatmapOptions => {
    const heatmapData = [];
    const days = ['Mon', 'Thu', 'Web', 'Thur', 'Fri', 'Sat', 'Sun'];
    days.forEach(day => {
      for (let i = 0; i < 12; i++) {
        heatmapData.push({
          day,
          time: `${i}:00`,
          value: Math.floor(Math.random() * 10),
        });
      }
    });
    return {
      data: heatmapData,
      xField: 'time',
      yField: 'day',
      colorField: 'value',
      color: _.join(theme.sequenceColors, '-'),
      theme,
    };
  }, [theme]);

  /** 适用于：矩阵树图 */
  const treemapOptions = useMemo((): TreemapOptions => {
    const treemapData = [];
    for (let i = 0; i < 20; i++) {
      treemapData.push({
        name: `分类 ${i}`,
        value: Math.floor(Math.random() * 10),
      });
    }
    return {
      data: {
        name: 'root',
        children: treemapData,
      },
      colorField: 'name',
      legend: { position: 'bottom' },
      theme,
    };
  }, [theme]);

  /** 适用于：仪表盘 */
  const gaugeOptions = useMemo((): GaugeOptions => {
    return {
      percent: 0.75,
      axis: {},
      range: {
        color: [theme.defaultColor, theme.subColor],
      },
      theme,
    };
  }, [theme]);

  const waterfallData = useMemo(() => {
    return [
      { month: 'Jan', value: 10 },
      { month: 'Feb', value: 42 },
      { month: 'March', value: -10 },
      { month: 'Apr', value: 31 },
      { month: 'May', value: -12 },
      { month: 'Jun', value: 10 },
    ];
  }, []);

  /** 适用于：瀑布图 */
  const waterfallOptions = useMemo((): WaterfallOptions => {
    const isBrowser = typeof document !== 'undefined';
    const themeType = isBrowser && document.body.getAttribute('data-theme');
    return {
      data: waterfallData,
      xField: 'month',
      yField: 'value',
      risingFill: theme.semanticRed,
      fallingFill: theme.semanticGreen,
      legend: { position: 'top-left' },
      total: {
        style: {
          fill:
            themeType === 'dark'
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(0, 0, 0, 0.25)',
        },
      },
      theme,
    };
  }, [theme, waterfallData]);

  const scatterData = useMemo(() => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result.push(
          {
            x: _.random(i + 2, 30, false),
            y: _.random(j + 2, 50, false),
            size: _.random(2, 8),
            genre: 'female',
          },
          {
            x: _.random(i + 2, 50, false),
            y: _.random(j + 2, 40, false),
            size: _.random(2, 10),
            genre: 'male',
          }
        );
      }
    }
    return result;
    // 主题变化，改变下数据
  }, [theme]);

  /** 适用于：散点图 */
  const scatterOptions = useMemo((): ScatterOptions => {
    return {
      data: scatterData,
      xField: 'x',
      yField: 'y',
      colorField: 'genre',
      sizeField: 'size',
      size: [5, 20],
      shape: 'circle',
      yAxis: { grid: {} },
      legend: { position: 'top-left' },
      sizeLegend: {},
      theme,
    };
  }, [theme, scatterData]);

  /** canvas 容器样式 */
  const containerStyle = useMemo(() => {
    return {
      color: _.get(theme, ['labels', 'style', 'fill']),
    };
  }, [theme]);

  const plotStyle = useMemo(() => {
    return {
      background: theme.background,
    };
  }, [theme]);

  return (
    <div className={styles.canvasContainer} style={containerStyle}>
      <UseG2Plot
        Ctor={Line}
        title="Line Plot"
        options={options1}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Area}
        title="Area Plot"
        options={options1}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Column}
        title="Stacked Column Plot"
        style={plotStyle}
        options={{
          ...columnOptions,
          isStack: true,
          slider: {},
        }}
      />
      <UseG2Plot
        Ctor={Column}
        title="Group Column Plot"
        style={plotStyle}
        options={{
          ...columnOptions,
          isGroup: true,
          scrollbar: { type: 'horizontal', categorySize: 100 },
        }}
      />
      <UseG2Plot
        Ctor={Bar}
        title="Bar Plot"
        options={barOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Bar}
        title="Group Bar Plot"
        style={plotStyle}
        options={{
          ...barOptions,
          isGroup: true,
          scrollbar: {
            type: 'vertical',
          },
        }}
      />
      <UseG2Plot
        Ctor={Waterfall}
        title="Waterfall Plot"
        options={waterfallOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={RadialBar}
        title="Radial Bar Plot"
        style={plotStyle}
        options={radialBarOptions}
      />
      <UseG2Plot
        Ctor={Radar}
        title="Radar Plot"
        options={radarOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Pie}
        title="Pie Plot"
        options={pieOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Gauge}
        title="Gauge Plot"
        options={gaugeOptions}
        style={plotStyle}
      />

      <UseG2Plot
        Ctor={Treemap}
        title="Treemap Plot"
        options={treemapOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Heatmap}
        title="Heatmap Plot"
        options={heatmapOptions}
        style={plotStyle}
      />
      <UseG2Plot
        Ctor={Scatter}
        title="Scatter Plot"
        options={scatterOptions}
        style={plotStyle}
      />
    </div>
  );
};