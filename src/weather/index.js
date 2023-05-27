(function (Scratch) {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const formatMessage = Scratch.formatMessage;

    const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8ZGVmcy8+CjxjbGlwUGF0aCBpZD0iQXJ0Ym9hcmRGcmFtZSI+CjxyZWN0IGhlaWdodD0iMTAyNCIgd2lkdGg9IjEwMjQiIHg9IjAiIHk9IjAiLz4KPC9jbGlwUGF0aD4KPGcgY2xpcC1wYXRoPSJ1cmwoI0FydGJvYXJkRnJhbWUpIiBpZD0i5peg5qCH6aKYIj4KPHBhdGggZD0iTTAgMEwxMDI0IDBMMTAyNCAxMDI0TDAgMTAyNEwwIDBaIiBmaWxsPSIjMjAyNDI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjAuMDEiIHN0cm9rZT0iIzAyMDMwMyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS13aWR0aD0iMTAiLz4KPHBhdGggZD0iTTcxNi44IDY4LjI2NjdDODQ4Ljc1OSA2OC4yNjY3IDk1NS43MzMgMTc1LjI0MSA5NTUuNzMzIDMwNy4yQzk1NS43MzMgNDM5LjE1OSA4NDguNzU5IDU0Ni4xMzMgNzE2LjggNTQ2LjEzM0M1ODQuODQxIDU0Ni4xMzMgNDc3Ljg2NyA0MzkuMTU5IDQ3Ny44NjcgMzA3LjJDNDc3Ljg2NyAxNzUuMjQxIDU4NC44NDEgNjguMjY2NyA3MTYuOCA2OC4yNjY3WiIgZmlsbD0iI2ZmYWE0NCIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9IiMwMjAzMDMiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2Utd2lkdGg9IjEwIi8+CjxwYXRoIGQ9Ik00NDMuNzMzIDIzOC45MzNDNTgxLjM1IDIzOC45MzYgNjk3LjQ2NyAzNDEuMzMxIDcxNC42ODQgNDc3Ljg2N0w3NTAuOTMzIDQ3Ny44NjdDODgyLjg5MyA0NzcuODY3IDk4OS44NjcgNTg0Ljg0MSA5ODkuODY3IDcxNi44Qzk4OS44NjcgODQ4Ljc1OSA4ODIuODkzIDk1NS43MzMgNzUwLjkzMyA5NTUuNzMzTDI3My4wNjcgOTU1LjczM0MxNjEuMjE4IDk1NS44MDUgNjQuMjg3MSA4NzguMjc2IDM5Ljc4MzcgNzY5LjE0NUMxNS4yODAzIDY2MC4wMTMgNjkuNzYyNSA1NDguNDg3IDE3MC45MDYgNTAwLjczNkMxNzYuOTQ2IDM1NC40MzQgMjk3LjMwNyAyMzguOTM3IDQ0My43MzMgMjM4LjkzM1oiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjwvZz4KPC9zdmc+Cg==';

    const WEATHER_URL = 'https://devapi.qweather.com/v7/weather/now?';
    const INDICES_URL = 'https://devapi.qweather.com/v7/indices/1d?';
    const AIR_QUALITY_URL = 'https://devapi.qweather.com/v7/air/now?';

    class WeatherBlocks {
        static get EXTENSION_ID () {
            return 'weather';
        }

        constructor () {
            this._cache = {};
            this.unit = 'm';
            this.key = '';

            this.runtime = Scratch.vm.runtime;
            this.runtime.on('BLOCKSINFO_UPDATE', this._clearCache.bind(this));
        }

        get MenuUnits () {
            return [
                {
                    text: formatMessage({
                        id: 'weather.unit.metric',
                        default: 'metric'
                    }),
                    value: 'm'
                },
                {
                    text: formatMessage({
                        id: 'weather.unit.imperial',
                        default: 'imperial'
                    }),
                    value: 'i'
                }
            ];
        }

        get MenuWeatherItems () {
            return [
                {
                    text: formatMessage({
                        id: 'weather.weather.text',
                        default: 'weather'
                    }),
                    value: 'text'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.temp',
                        default: 'temperature'
                    }),
                    value: 'temp'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.feelsLike',
                        default: 'feels like temperature'
                    }),
                    value: 'feelsLike'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.humidity',
                        default: 'humidity'
                    }),
                    value: 'humidity'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.windDir',
                        default: 'wind direction'
                    }),
                    value: 'windDir'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.windScale',
                        default: 'wind scale'
                    }),
                    value: 'windScale'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.windSpeed',
                        default: 'wind speed'
                    }),
                    value: 'windSpeed'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.precip',
                        default: 'precipitation'
                    }),
                    value: 'precip'
                },
                {
                    text: formatMessage({
                        id: 'weather.weather.pressure',
                        default: 'atmospheric pressure'
                    }),
                    value: 'pressure'
                }
            ];
        }

        get MenuIndicesTypes () {
            return [
                {
                    text: formatMessage({
                        id: 'weather.indices.uv',
                        default: 'UV'
                    }),
                    value: '5'
                },
                {
                    text: formatMessage({
                        id: 'weather.indices.sports',
                        default: 'sports'
                    }),
                    value: '1'
                },
                {
                    text: formatMessage({
                        id: 'weather.indices.carwash',
                        default: 'car wash'
                    }),
                    value: '2'
                },
                {
                    text: formatMessage({
                        id: 'weather.indices.fishing',
                        default: 'fishing'
                    }),
                    value: '4'
                }
            ];
        }

        get MenuPollutanTypes () {
            return [
                {
                    text: formatMessage({
                        id: 'weather.pollutant.primary',
                        default: 'primary'
                    }),
                    value: 'primary'
                },
                {
                    text: 'PM10',
                    value: 'pm10'
                },
                {
                    text: 'PM2.5',
                    value: 'pm2p5'
                },
                {
                    text: formatMessage({
                        id: 'weather.pollutant.no2',
                        default: 'nitrogen dioxide'
                    }),
                    value: 'no2'
                },
                {
                    text: formatMessage({
                        id: 'weather.pollutant.so2',
                        default: 'sulfur dioxide'
                    }),
                    value: 'so2'
                },
                {
                    text: formatMessage({
                        id: 'weather.pollutant.co',
                        default: 'carbon monoxide'
                    }),
                    value: 'co'
                },
                {
                    text: formatMessage({
                        id: 'weather.pollutant.o3',
                        default: 'ozone'
                    }),
                    value: 'o3'
                }
            ];
        }

        getInfo () {
            const locale = formatMessage.setup().locale;
            return {
                id: WeatherBlocks.EXTENSION_ID,
                name: formatMessage({
                    id: 'weather.name',
                    default: 'Weather'
                }),
                blockIconURI,
                docsURI: Scratch.require.resolve(`readme.${locale}.html`),
                blocks: [
                    {
                        opcode: 'getWeather',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getWeather',
                            default: 'current [WEATHER]'
                        }),
                        arguments: {
                            WEATHER: {
                                type: ArgumentType.STRING,
                                menu: 'weatherItems',
                                defaultValue: 'text'
                            }
                        }
                    },
                    {
                        opcode: 'getIndices',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getIndices',
                            default: '[TYPE] indices'
                        }),
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'indicesTypes',
                                defaultValue: '5'
                            }
                        }
                    },
                    {
                        opcode: 'getIndicesCategory',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getIndicesCategory',
                            default: '[TYPE] indices category'
                        }),
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'indicesTypes',
                                defaultValue: '5'
                            }
                        }
                    },
                    {
                        opcode: 'getAQI',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getAQI',
                            default: 'AQI'
                        }),
                        disableMonitor: true
                    },
                    {
                        opcode: 'getAQICategory',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getAQICategory',
                            default: 'AQI category'
                        }),
                        disableMonitor: true
                    },
                    {
                        opcode: 'getPollutant',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'weather.getPollutant',
                            default: '[TYPE] pollutant'
                        }),
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'pollutantTypes',
                                defaultValue: 'primary'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setUnit',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'weather.setUnit',
                            default: '[UNIT] units'
                        }),
                        arguments: {
                            UNIT: {
                                type: ArgumentType.STRING,
                                menu: 'units',
                                defaultValue: this.unit,
                            },
                        }
                    },
                ],
                menus: {
                    units: this.MenuUnits,
                    weatherItems: this.MenuWeatherItems,
                    indicesTypes: this.MenuIndicesTypes,
                    pollutantTypes: this.MenuPollutanTypes
                }
            };
        }

        _getToken () {
            try {
                const token = Scratch.extensions.getConfig(WeatherBlocks.EXTENSION_ID);
                this.key = token.key;
            } catch (e) { /* ignore */ }
        }

        get _unknownMessage () {
            return formatMessage({
                id: 'weather.unknown',
                default: 'unknown',
            })
        }

        get _language () {
            const {locale} = formatMessage.setup();
            return locale.split('-')[0];
        }

        _getLocation () {
            if (this._cache.location) {
                return this._cache.location;
            }
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(({coords}) => {
                    const lat = coords.latitude.toFixed(2);
                    const long = coords.longitude.toFixed(2);
                    const location = `${long},${lat}`;
                    this._cache.location = location;
                    resolve(location);
                }, reject);
            });
        }

        async _fetchWeather (baseUrl, queryStr) {
            try {
                let url = baseUrl + (queryStr || '');
                url += `&key=${this.key}`
                url += `&location=${await this._getLocation()}`
                url += `&lang=${this._language}`;
                const res = await (await fetch(url)).json();
                if (res.code === '200') return res;
            } catch (err) {
                console.error(`${err}`);
            }
        }

        setUnit (args) {
            this.unit = args.UNIT;
            this._clearCache();
        }

        async getWeather (args) {
            if (!this.key) {
                this._getToken();
            }
            if (!this.key) {
                return this._unknownMessage;
            }

            let weather = this._cache.weather;

            if (!weather) {
                const data = await this._fetchWeather(WEATHER_URL, `unit=${this.unit}`);
                if (!data || !data.now) {
                    return this._unknownMessage;
                }
                weather = data.now;
                this._cache.weather = weather;
            }

            return weather[args.WEATHER] || this._unknownMessage;
        }

        async getIndices (args) {
            if (!this.key) {
                await this._getToken();
            }
            if (!this.key) {
                return this._unknownMessage;
            }

            let indices = this._cache.indices;

            if (!indices) {
                const data = await this._fetchWeather(INDICES_URL, 'type=1,2,4,5');
                if (!data || !data.daily) {
                    return this._unknownMessage;
                }
                indices = data.daily;
                this._cache.indices = indices;
            }

            const data = indices.find(ind => ind.type == args.TYPE);

            return data ? data.level : this._unknownMessage;
        }

        async getIndicesCategory (args) {
            if (!this.key) {
                await this._getToken();
            }
            if (!this.key) {
                return this._unknownMessage;
            }

            let indices = this._cache.indices;

            if (!indices) {
                const data = await this._fetchWeather(INDICES_URL, 'type=1,2,4,5');
                if (!data || !data.daily) {
                    return this._unknownMessage;
                }
                indices = data.daily;
                this._cache.indices = indices;
            }

            const data = indices.find(ind => ind.type == args.TYPE);

            return data ? data.category : this._unknownMessage;
        }

        async _getAirQuality (type) {
            if (!this.key) {
                await this._getToken();
            }
            if (!this.key) {
                return this._unknownMessage;
            }

            let airQuality = this._cache.airQuality;

            if (!airQuality) {
                const data = await this._fetchWeather(AIR_QUALITY_URL);
                if (!data || !data.now) {
                    return this._unknownMessage;
                }
                airQuality = data.now;
                this._cache.airQuality = airQuality;
            }

            return airQuality[type] || this._unknownMessage;
        }

        getAQI () {
            return this._getAirQuality('aqi');
        }

        getAQICategory () {
            return this._getAirQuality('category');
        }

        async getPollutant (args) {
            const value = await this._getAirQuality(args.TYPE);
            return value === 'NA' ? '无' : value;
        }

        _clearCache () {
            this._cache = {};
        }
    }

    Scratch.extensions.register(new WeatherBlocks());

    Scratch.extensions.translations({
        en: {
            'weather.name': 'Weather',
            'weather.unknown': 'unknown',
            'weather.setKey': 'QWeather authentication [KEY]',
            'weather.setUnit': '[UNIT] units',
            'weather.unit.metric': 'metric',
            'weather.unit.imperial': 'imperial',
            'weather.getWeather': 'current [WEATHER]',
            'weather.weather.text': 'weather',
            'weather.weather.temp': 'temperature',
            'weather.weather.feelsLike': 'feels like temperature',
            'weather.weather.humidity': 'humidity',
            'weather.weather.windDir': 'wind direction',
            'weather.weather.windScale': 'wind scale',
            'weather.weather.windSpeed': 'wind speed',
            'weather.weather.precip': 'precipitation',
            'weather.weather.pressure': 'atmospheric pressure',
            'weather.getIndices': '[TYPE] indices',
            'weather.getIndicesCategory': '[TYPE] indices category',
            'weather.indices.uv': 'UV',
            'weather.indices.sports': 'sports',
            'weather.indices.carwash': 'car wash',
            'weather.indices.fishing': 'fishing',
            'weather.getAQI': 'AQI',
            'weather.getAQICategory': 'AQI category',
            'weather.getPollutant': '[TYPE] pollutant',
            'weather.pollutant.primary': 'primary',
            'weather.pollutant.no2': 'nitrogen dioxide',
            'weather.pollutant.so2': 'sulfur dioxide',
            'weather.pollutant.co': 'carbon monoxide',
            'weather.pollutant.o3': 'ozone',
        },
        'zh-cn': {
            'weather.name': '天气',
            'weather.unknown': '未知',
            'weather.setKey': '和风天气认证 [KEY]',
            'weather.setUnit': '[UNIT]单位',
            'weather.unit.metric': '公制',
            'weather.unit.imperial': '英制',
            'weather.getWeather': '当前 [WEATHER]',
            'weather.weather.text': '天气',
            'weather.weather.temp': '温度',
            'weather.weather.feelsLike': '体感温度',
            'weather.weather.humidity': '湿度',
            'weather.weather.windDir': '风向',
            'weather.weather.windScale': '风力等级',
            'weather.weather.windSpeed': '风速',
            'weather.weather.precip': '降水量',
            'weather.weather.pressure': '气压',
            'weather.getIndices': '[TYPE] 指数',
            'weather.indices.uv': '紫外线',
            'weather.indices.sports': '运动',
            'weather.indices.carwash': '洗车',
            'weather.indices.fishing': '钓鱼',
            'weather.getIndicesCategory': '[TYPE] 指数级别',
            'weather.getAQI': '空气质量指数',
            'weather.getAQICategory': '空气质量指数级别',
            'weather.getPollutant': '[TYPE] 污染物',
            'weather.pollutant.primary': '主要',
            'weather.pollutant.no2': '二氧化氮',
            'weather.pollutant.so2': '二氧化硫',
            'weather.pollutant.co': '一氧化碳',
            'weather.pollutant.o3': '臭氧',
        },
        'zh-tw': {
            'weather.name': '天氣',
            'weather.unknown': '未知',
            'weather.setKey': '和風天氣認證 [KEY]',
            'weather.setUnit': '[UNIT]單位',
            'weather.unit.metric': '公製',
            'weather.unit.imperial': '英製',
            'weather.getWeather': '當前 [WEATHER]',
            'weather.weather.text': '天氣',
            'weather.weather.temp': '溫度',
            'weather.weather.feelsLike': '體感溫度',
            'weather.weather.humidity': '濕度',
            'weather.weather.windDir': '風向',
            'weather.weather.windScale': '風力等級',
            'weather.weather.windSpeed': '風速',
            'weather.weather.precip': '降水量',
            'weather.weather.pressure': '氣壓',
            'weather.getIndices': '[TYPE] 指數',
            'weather.indices.uv': '紫外線',
            'weather.indices.sports': '運動',
            'weather.indices.carwash': '洗車',
            'weather.indices.fishing': '釣魚',
            'weather.getIndicesCategory': '[TYPE] 指數級別',
            'weather.getAQI': '空氣質量指數',
            'weather.getAQICategory': '空氣質量指數級別',
            'weather.getPollutant': '[TYPE] 汙染物',
            'weather.pollutant.primary': '主要',
            'weather.pollutant.no2': '二氧化氮',
            'weather.pollutant.so2': '二氧化硫',
            'weather.pollutant.co': '一氧化碳',
            'weather.pollutant.o3': '臭氧',
        },
    });
})(window.Scratch);
