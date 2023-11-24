function dateFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getAjaxUrl() {
    return "http://162.223.91.117:5000/api"
}

function getAjaxUrlTest() {
    return "http://162.223.91.117:5000/api/test"
}

function getKey() {
    return "yy7s39X2wQhqxYtp8euO"
}

function getKeyParam() {
    const urlParams = new URLSearchParams(window.location.search)

    return urlParams.get('key')
}

function columns() {
    return [
        {
            data: 'seq',
            name: 'seq',
            editField: ['report[]'],
            render: function (data, type) {
                if (type === 'display') {
                    return '<div class="action-buttons">' +
                        '<div class="pl"><i class="fa fa-ban"></i></div> ' +
                        '<div class="hz"><i class="fa fa-fire"></i></div> ' +
                        `<div class="row">${data}</div>` +
                        '<div class="refresh"><i class="fa fa-refresh"></i></div> ' +
                        '<div class="report"><i class="fa fa-user"></i></div> ' +
                        '</div>';
                }

                return data;
            }
        },
        {
            data: 'source.updatedAt',
            name: 'source.updatedAt',
            className: 'inline-block',
            render: function (data, type) {
                if (type === 'display') {
                    let currentDate = new Date();
                    const date = new Date(data)
                    let timeDiff = currentDate.getTime() - date.getTime();

                    let seconds = Math.floor(timeDiff / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);

                    if (days > 0) {
                        return days + " days ago";
                    } else if (hours > 0) {
                        return hours + " hours ago";
                    } else if (minutes > 0) {
                        return minutes + " minutes ago";
                    } else {
                        return "a few seconds before";
                    }
                }

                return data;
            }
        },
        {
            data: null,
            name: 'hiddenDays',
            className: 'bubble-edit inline-block',
            render: function (data, type) {
                const todayy = new Date()
                if (!data?.hiddenDays || data.hiddenDays === 0) {
                    return 'Allowed'
                }

                if (type === 'display') {

                    if (data?.hiddenCreatedAt) {
                        const hiddenCreatedAt = new Date(data.hiddenCreatedAt)
                        const today = new Date()
                        const hiddenDays = data.hiddenDays

                        const futureDate = new Date(hiddenCreatedAt.getFullYear(), hiddenCreatedAt.getMonth(), hiddenCreatedAt.getDate() + hiddenDays);

                        const timeDiff = Math.abs(today - futureDate);
                        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                        if (today > futureDate || daysDiff === 0) {
                            return 'Allowed'
                        } else {
                            return `${daysDiff} days Forbidden`
                        }
                    }
                }

                return data.hiddenDays;
            },
            editField: ['hiddenDays']
        },
        {
            data: "status",
            className: 'bubble-edit status-cell inline-block',
            name: 'status',
            render: function (data, type) {
                if (type === 'display') {
                    if (data === 'not_checked') {
                        return 'Not checked'
                    } else if (data === 'match') {
                        return 'Match'
                    } else if (data === 'mis_match') {
                        return 'Mismatch'
                    }
                }

                return data;
            }
        },
        {
            data: 'source',
            name: 'source.images',
            className: 'inline-block',
            orderable: false,
            render: function (source) {
                let url = source?.url
                let image = source?.images[0]

                if (url.startsWith('www')) url = 'https://' + url
                if (!image) {
                    image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88Y6Jdz9jnkpHRk-0BCC80cboBoaTghwOLA&usqp=CAU"
                }
                if (image?.startsWith("//")) image = "https:" + image

                return `<a href="${url}"><img src="${image}" style="min-width: 100px; min-height: 100px; opacity: 1;max-width: 100px; max-height: 100px;"></a>`
            },
            defaultContent: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88Y6Jdz9jnkpHRk-0BCC80cboBoaTghwOLA&usqp=CAU" style="min-width: 100px; min-height: 100px; opacity: 1;max-width: 100px; max-height: 100px;">`,
            title: 'Src Image'
        },
        {
            data: 'amazon',
            name: 'amazon.images',
            className: 'inline-block',
            orderable: false,
            render: function (amazon) {
                if (amazon?.images?.length) {
                    return `<a href="https://amazon.com/dp/${amazon?.asin}"><img src="${amazon?.images[0]}" style="min-width: 100px; min-height: 100px; opacity: 1;max-width: 100px; max-height: 100px;"></a>`
                }
                return `<a href="https://amazon.com/dp/${amazon?.asin}"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88Y6Jdz9jnkpHRk-0BCC80cboBoaTghwOLA&usqp=CAU" style="min-width: 100px; min-height: 100px; opacity: 1;max-width: 100px; max-height: 100px;"></a>`
            },
            defaultContent: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88Y6Jdz9jnkpHRk-0BCC80cboBoaTghwOLA&usqp=CAU" style="min-width: 100px; min-height: 100px; opacity: 1;max-width: 100px; max-height: 100px;">`,
            title: 'Amazon Image'
        },
        {
            data: 'source.numPack',
            name: 'source.numPack',
            className: 'inline-block bubble-edit',
            render: function (data, type) {
                if (!data) {
                    return '1 Pack'
                }
                if (type === 'display') {
                    return `${data} Pack`
                }

                return data;
            }
        },
        {
            data: 'amazon.numPack',
            name: 'amazon.numPack',
            className: 'inline-block bubble-edit',
            render: function (data, type) {
                if (!data) {
                    return '1 Pack'
                }
                if (type === 'display') {
                    return `${data} Pack`
                }

                return data;
            }
        },
        {
            data: 'source.price',
            name: 'source.price',
            className: 'inline-block',
            render: function (data, type) {
                let number = DataTable.render
                    .number(',', '.', 2, '$')
                    .display(data);

                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = '#000000';

                    return `<span style="color:${color}">${number}</span>`;
                }

                return number;
            }
        },
        {
            data: 'amazon.price',
            name: 'amazon.price',
            className: 'inline-block',
            render: function (data, type) {
                let number = DataTable.render
                    .number(',', '.', 2, '$')
                    .display(data);

                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = '#000000';

                    return `<span style="color:${color}">${number}</span>`;
                }

                return number;
            }
        },
        {
            data: 'profit',
            name: 'profit',
            className: 'inline-block',
            render: function (data, type) {
                let number = DataTable.render
                    .number(',', '.', 2, '$')
                    .display(data);

                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = 'green';
                    if (data < 5) {
                        color = 'red';
                    }

                    return `<span style="color:${color}">${number}</span>`;
                }

                return number;
            }
        },
        {
            data: 'roi',
            name: 'roi',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = 'green';
                    if (data < 30) {
                        color = 'red';
                    }

                    return `<span style="color:${color}">${data}%</span>`;
                }

                return data + '%';
            }
        },
        {
            data: 'source.url',
            name: 'source.url',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    try {
                        const domain = data.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/)[1];
                        if (!data.startsWith('http')) return `<a href="https://${data}">${domain}</a>`;

                        return '<a href="' + data + '">' + domain + '</a>';
                    } catch (e) {
                        return 'Url is invalid'
                    }
                }

                return data;
            }
        },
        {
            data: 'amazon.asin',
            name: 'amazon.asin',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    return `<a href="https://amazon.com/dp/${data}">${data}</a>`
                }

                return data;
            }
        },
        {
            data: 'couponPrice',
            name: 'couponPrice',
            className: 'inline-block',
            render: function (data, type) {
                let number = DataTable.render
                    .number(',', '.', 2, '$')
                    .display(data);

                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = '#000000';

                    return `<span style="color:${color}">${number}</span>`;
                }

                return number;
            }
        },
        {
            data: 'couponProfit',
            name: 'couponProfit',
            className: 'inline-block',
            render: function (data, type) {
                let number = DataTable.render
                    .number(',', '.', 2, '$')
                    .display(data);

                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = 'green';
                    if (data < 5) {
                        color = 'red';
                    }

                    return `<span style="color:${color}">${number}</span>`;
                }

                return number;
            }
        },
        {
            data: 'couponRoi',
            name: 'couponRoi',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = 'green';
                    if (data < 30) {
                        color = 'red';
                    }

                    return `<span style="color:${color}">${data}%</span>`;
                }

                return data + '%';
            }
        },
        {
            data: 'source.coupon',
            name: 'source.coupon',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return null
                }

                if (type === 'display') {
                    return data?.code + ', ' + data?.discountPercent + '%'
                }

                return data?._id;
            }
        },
        {
            data: 'amazon.brand',
            name: 'amazon.brand',
            className: 'inline-block',
            render: function (data) {
                if (!data) {
                    return ''
                }

                return data;
            }
        },
        {
            data: 'amazon.isPL',
            name: 'amazon.isPL',
            className: 'inline-block bubble-edit pl-cell',
            editField: ['amazon.isPL'],
            render: function (data, type) {

                if (type === 'display') {
                    if (!data) {
                        return 'No'
                    }
                    return 'Yes'
                }

                if (!data) return false

                return data;
            }
        },
        {
            data: 'amazon.isHZ',
            name: 'amazon.isHZ',
            className: 'inline-block bubble-edit hz-cell',
            editField: ['amazon.isHZ'],
            render: function (data, type) {

                if (type === 'display') {
                    if (!data) {
                        return 'No'
                    }
                    return 'Yes'
                }
                if (!data) return false

                return data;
            }
        },
        {
            data: 'amazon.updatedAt',
            name: 'amazon.updatedAt',
            className: 'inline-block',
            render: function (data, type) {
                if (type === 'display') {
                    let currentDate = new Date();
                    const date = new Date(data)
                    let timeDiff = currentDate.getTime() - date.getTime();

                    let seconds = Math.floor(timeDiff / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);

                    if (days > 0) {
                        return days + " days ago";
                    } else if (hours > 0) {
                        return hours + " hours ago";
                    } else if (minutes > 0) {
                        return minutes + " minutes ago";
                    } else {
                        return "a few seconds before";
                    }
                }

                return data;
            }
        },
        {
            data: 'updatedAt',
            name: 'updatedAt',
            className: 'inline-block',
            render: function (data, type) {
                if (type === 'display') {
                    let currentDate = new Date();
                    const date = new Date(data)
                    let timeDiff = currentDate.getTime() - date.getTime();

                    let seconds = Math.floor(timeDiff / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);

                    if (days > 0) {
                        return days + " days ago";
                    } else if (hours > 0) {
                        return hours + " hours ago";
                    } else if (minutes > 0) {
                        return minutes + " minutes ago";
                    } else {
                        return "a few seconds before";
                    }
                }

                return data;
            }
        },
        {
            data: null,
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return 'Coming Soon!'
                }

                if (type === 'display') {

                    return 'Coming Soon!'
                }

                return data;
            }
        },
        {
            data: 'source.availability',
            name: 'source.availability',
            className: 'inline-block',
            render: function (data, type) {
                if (type === 'display') {
                    if (data === false) {
                        return 'Out of Stock'
                    } else if (data === true) {
                        return 'In Stock'
                    }
                }
                return data;
            }
        },
        {
            data: 'source.title',
            name: 'source.title',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return '-----'
                }

                if (type === 'display') {

                    return `<span title="${data}">${data}</span>`;
                }

                return data;
            }
        },
        {
            data: 'amazon.title',
            name: 'amazon.title',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return '-----'
                }

                if (type === 'display') {

                    return `<span title="${data}">${data}</span>`;
                }

                return data;
            }
        },
        {
            data: 'amazon.category',
            name: 'amazon.category',
            className: 'inline-block category-style',
            render: function (data, type) {
                if (!data) {
                    return ''
                }
                if (type === 'display') {
                    let color = '#0d904f';

                    return `<span style="color:${color}">${data}</span>`;
                }

                return data;
            }
        },
        {
            data: 'amazon.isIp',
            name: 'amazon.isIp',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return 'Not Check'
                }

                if (type === 'display' && data === true) {
                    return 'Yes'
                } else if (type === 'display' && data === false) {
                    return 'No'
                }


                return data;
            }
        },
        {
            data: 'amazon.size',
            name: 'amazon.size',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return '-----'
                }

                return data;
            }
        },
        {
            data: 'amazon.seller',
            name: 'amazon.seller',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return '-----'
                }

                return data;
            }
        },
        {
            data: 'amazon.bsr',
            name: 'amazon.bsr',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }

                return data;
            }
        },
        {
            data: 'amazon.mSales',
            name: 'amazon.mSales',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return '---'
                }

                return data;
            }
        },
        {
            data: 'matchQuality',
            name: 'matchQuality',
            className: 'inline-block',
            render: function (data, type) {
                if (!data) {
                    return ''
                }

                return data;
            }
        },
        {
            data: 'source.note',
            name: 'source.note',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return ''
                }

                if (type === 'display') {
                    return `<span title="${data}">${data}</span>`
                }

                return data;
            }
        },
        {
            data: 'amazon.note',
            name: 'amazon.note',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return ''
                }

                if (type === 'display') {
                    return `<span title="${data}">${data}</span>`
                }

                return data;
            }
        },
        {
            data: 'report',
            name: 'report',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return '----'
                }
                if (type === 'display') {
                    return `<span title="${data}">${data}</span>`;
                }

                return data;
            }
        },
        {
            data: 'sourceData',
            name: 'sourceData',
            className: 'text-max-length',
            render: function (data, type) {
                if (!data) {
                    return '----'
                }
                if (type === 'display') {
                    return `<span title="${data}">${data}</span>`;
                }

                return data;
            }
        },
    ]
}

function searchBuilderColumns() {
    return [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
}

function columnDefs() {
    return [
        {
            targets: 0,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'ID',
        },
        {
            targets: 1,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Source Updated At',
            searchBuilderType: 'date',
        },
        {
            targets: 2,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Hide',
        },
        {
            targets: 3,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Status',
            searchBuilderType: 'string',
        },
        {
            targets: 6,
            searchBuilderTitle: 'Source Number Pack',
            searchBuilder: {
                defaultCondition: '=',
            },
        },
        {
            targets: 7,
            searchBuilderTitle: 'Amazon Number Pack',
            searchBuilder: {
                defaultCondition: '=',
            },
        },
        {
            targets: 8,
            searchBuilderTitle: 'Source Price',
            searchBuilder: {
                defaultCondition: '<',
            },
        },
        {
            targets: 9,
            searchBuilderTitle: 'Amazon Price',
            searchBuilder: {
                defaultCondition: '<',
            },
        },
        {
            targets: 10,
            searchBuilderTitle: 'Profit',
            searchBuilder: {
                defaultCondition: '>',
            },
        },
        {
            targets: 11,
            searchBuilderTitle: 'ROI',
            searchBuilder: {
                defaultCondition: '>',
            },
        },
        {
            targets: 12,
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderTitle: 'Source URL',
        },
        {
            targets: 13,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'ASIN',
        },
        {
            targets: 14,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'Src price after coupon',
        },
        {
            targets: 15,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'Profit (C)',
        },
        {
            targets: 16,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'ROI (C)',
        },
        {
            targets: 17,
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderTitle: 'Coupon code',
        },
        {
            targets: 18,
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderTitle: 'Brand',
        },
        {
            target: 19,
            visible: false,
            searchBuilderTitle: 'PL',
        },
        {
            target: 20,
            visible: false,
            searchBuilderTitle: 'HZ',
        },
        {
            targets: 21,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Amazon Updated At',
            searchBuilderType: 'date',
        },
        {
            targets: 22,
            visible: false,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Lead Updated At',
            searchBuilderType: 'date',
        },
        {
            target: 23,
            visible: false,
            searchBuilderTitle: 'Graph',
        },
        {
            target: 24,
            searchBuilderTitle: 'Availability',
            searchBuilder: {
                defaultCondition: '=',
            },
        },
        {
            targets: 25,
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderTitle: 'Source Title',
            searchBuilderType: 'string',
        },
        {
            targets: 26,
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderTitle: 'Amazon Title',
            searchBuilderType: 'string',
        },
        {
            targets: 27,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Category',
        },
        {
            targets: 28,
            visible: false,
            searchBuilderTitle: 'Is IP?',
        },
        {
            targets: 29,
            visible: false,
            searchBuilderTitle: 'Size',
        },
        {
            targets: 30,
            visible: false,
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderTitle: 'Seller',
        },
        {
            targets: 31,
            searchBuilder: {
                defaultCondition: '<',
            },
            searchBuilderTitle: 'BSR',
        },
        {
            targets: 32,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'Sales',
            searchBuilderType: 'num',
        },
        {
            targets: 33,
            visible: false,
            searchBuilder: {
                defaultCondition: '>',
            },
            searchBuilderTitle: 'Quality',
        },
        {
            targets: 34,
            searchBuilderTitle: 'Source note',
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderType: 'string',
        },
        {
            targets: 35,
            searchBuilderTitle: 'Amazon note',
            searchBuilder: {
                defaultCondition: 'contains',
            },
            searchBuilderType: 'string',
        },
        {
            targets: 36,
            visible: false,
            searchBuilderTitle: 'Report',
            searchBuilder: {
                defaultCondition: '=',
            },
            searchBuilderType: 'string',
        },
        {
            target: 37,
            visible: false,
            searchBuilderTitle: 'Source Data',
        },
    ]
}

function editorFields() {
    return [{
        label: "Status:",
        name: "status",
        type: 'select',
        def: 'not_checked'
    }, {
        label: "Report:",
        name: 'report[]',
        type: 'checkbox'
    }, {
        label: "Hidden Days:",
        name: "hiddenDays",
        def: 0,
        attr: {
            type: "number"
        }
    }, {
        label: "Number of Pack:",
        name: "amazon.numPack",
        def: 1,
        attr: {
            type: "number"
        }
    }, {
        label: "Is Hazmat?",
        name: "amazon.isHZ",
        options: [{label: "Yes", value: true}, {label: "No", value: false}],
        type: 'radio'
    }, {
        label: "Is Private Label?",
        name: "amazon.isPL",
        options: [{label: "Yes", value: true}, {label: "No", value: false}],
        type: 'radio'
    },{
        label: "Number of Pack:",
        name: "source.numPack",
        def: 1,
        attr: {
            type: "number"
        }
    }]
}

function searchQueueEditorFields() {
    return [{
        label: "Title:",
        name: "title",
    }]
}

function eventRefreshLink(table) {
    table.on('click', 'div.action-buttons .refresh', function (e) {
        let rowTag = e.target.closest('tr');
        let row = table.row(rowTag);
        let rowData = row.data();

        $('#example_processing').css('display', 'block')

        $.ajax({
            type: "GET",
            url: getAjaxUrl() + '/' + rowData['_id'] + '?key=' + getKey(),
            success: function (data) {
                row.data({
                    ...data.data,
                })
                successResLeadAjax(data, rowTag)
            }

        });

        $('#example_processing').css('display', 'none')
    });
}

function toggleHideShowColumns() {
    document.querySelectorAll('a.toggle-vis').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();

            let columnIdx = e.target.getAttribute('data-column');
            let column = table.column(columnIdx);

            // Toggle the visibility
            column.visible(!column.visible());
        });
    });
}

function jumpToPage(table) {
    const jumpToPage = document.querySelector('#jump_page');
    jumpToPage.setAttribute('value', table.page() + 1)
    jumpToPage.addEventListener('change', () => {
        if (jumpToPage.value > 0) {
            table.page(jumpToPage.value - 1).draw('page');
        }
    });
    table.on('page.dt', function () {
        jumpToPage.setAttribute('value', table.page() + 1)
    });
}

function rowCallback(row, data) {
    if (data?.status === 'mis_match') {
        $(row).removeClass('match-row');
        $(row).removeClass('hidden-row');
        $(row).removeClass('pl-row');
        $(row).removeClass('hz-row');
        $(row).addClass('mismatch-row');
    }

    if (data?.status === 'match') {
        $(row).removeClass('mismatch-row');
        $(row).removeClass('hidden-row');
        $(row).removeClass('pl-row');
        $(row).removeClass('hz-row');
        $(row).addClass('match-row');
    }

    if (data?.hiddenCreatedAt && data?.hiddenDays && data?.status !== 'mis_match') {
        const createdAt = new Date(data.hiddenCreatedAt)
        const today = new Date()
        const hiddenDays = data.hiddenDays

        const futureDate = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate() + hiddenDays);

        const timeDiff = Math.abs(today - futureDate);
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (today > futureDate || daysDiff === 0) {
            $(row).removeClass('hidden-row');
        } else if (today < futureDate) {
            $(row).addClass('hidden-row');
            $(row).removeClass('match-row');
            $(row).removeClass('mismatch-row');
            $(row).removeClass('pl-row');
            $(row).removeClass('hz-row');
        }
    }

    if (data?.amazon?.isPL) {
        $(row).removeClass('match-row');
        $(row).removeClass('hidden-row');
        $(row).removeClass('hz-row');
        $(row).removeClass('mismatch-row');
        $(row).addClass('pl-row');
    }

    if (data?.amazon?.isHZ) {
        $(row).removeClass('match-row');
        $(row).removeClass('hidden-row');
        $(row).removeClass('pl-row');
        $(row).removeClass('mismatch-row');
        $(row).addClass('hz-row');
    }

}

const processingDom = () => {
    return '<div id="loading-wrapper">\n' +
        '  <div id="loading-text">LOADING</div>\n' +
        '  <div id="loading-content"></div>\n' +
        '</div>'
}

function eventPlClick(table) {
    table.on('click', 'div.action-buttons .pl', function (e) {
        let rowTag = e.target.closest('tr');
        let row = table.row(rowTag);
        let rowData = row.data();

        $('#example_processing').css('display', 'block')

        $.ajax({
            type: "PUT",
            url: getAjaxUrl() + '/leads/' + rowData['_id'] + '?key=' + getKey(),
            contentType: 'application/json',
            data: JSON.stringify({
                amazon: {
                    isPL: !rowData?.amazon?.isPL
                }
            }),
            dataType: 'json',
            success: function (data) {
                row.data({
                    ...data.data,
                }).draw(false)
            }
        });

        $('#example_processing').css('display', 'none')
    });
}

function eventHzClick(table) {
    table.on('click', 'div.action-buttons .hz', function (e) {
        let rowTag = e.target.closest('tr');
        let row = table.row(rowTag);
        let rowData = row.data();

        $('#example_processing').css('display', 'block')

        $.ajax({
            type: "PUT",
            url: getAjaxUrl() + '/leads/' + rowData['_id'] + '?key=' + getKey(),
            contentType: 'application/json',
            data: JSON.stringify({
                amazon: {
                    isHZ: !rowData?.amazon?.isHZ
                }
            }),
            dataType: 'json',
            success: function (data) {
                row.data({
                    ...data.data,
                }).draw(false)
            }
        });

        $('#example_processing').css('display', 'none')
    });
}

function successResLeadAjax(data, rowTag) {
    const resData = data.data

    if (resData?.status === 'mis_match') {
        $(rowTag).removeClass('match-row');
        $(rowTag).removeClass('hidden-row');
        $(rowTag).removeClass('pl-row');
        $(rowTag).removeClass('hz-row');
        $(rowTag).addClass('mismatch-row');
    }

    if (resData?.status === 'match') {
        $(rowTag).removeClass('mismatch-row');
        $(rowTag).removeClass('hidden-row');
        $(rowTag).removeClass('pl-row');
        $(rowTag).removeClass('hz-row');
        $(rowTag).addClass('match-row');
    }

    if (resData?.hiddenCreatedAt && resData?.hiddenDays) {
        const createdAt = new Date(resData.hiddenCreatedAt)
        const today = new Date()
        const hiddenDays = resData.hiddenDays

        const futureDate = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate() + hiddenDays);

        if (today < futureDate) {
            $(rowTag).removeClass('match-row');
            $(rowTag).removeClass('mismatch-row');
            $(rowTag).removeClass('pl-row');
            $(rowTag).removeClass('hz-row');
            $(rowTag).addClass('hidden-row');
        }
    }

    if (resData?.amazon?.isPL) {
        $(rowTag).removeClass('match-row');
        $(rowTag).removeClass('mismatch-row');
        $(rowTag).removeClass('hidden-row');
        $(rowTag).removeClass('hz-row');
        $(rowTag).addClass('pl-row');
    }

    if (resData?.amazon?.isHZ) {
        $(rowTag).removeClass('match-row');
        $(rowTag).removeClass('mismatch-row');
        $(rowTag).removeClass('hidden-row');
        $(rowTag).removeClass('pl-row');
        $(rowTag).addClass('hz-row');
    }
}