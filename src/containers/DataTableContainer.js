import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import WebSocketService from '../utils/WebSocketService'

class DataTableContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
          orderItems : []
        };

        this.batchData = [];
        this.batchInterval = null;
    }

    async componentDidMount() {
        WebSocketService.addListener(this.handleWebSocketMessage)

        WebSocketService.waitForOpen().then(() => {
            WebSocketService.sendMessage({ type: 'fetch_data' });
        }).catch ((error) => {
            console.error("WebSocket 연결 실패:", error);
            alert("서버 연결에 실패했습니다.");
        });

        this.batchInterval = setInterval(() => {
            if (this.batchData.length > 0) {
                this.setState({ orderItems: [...this.batchData] });
                this.batchData = [];
            }
        }, 1000);
    }

    componentWillUnmount() {
        WebSocketService.removeListener(this.handleWebSocketMessage);
        clearInterval(this.batchInterval);
    }

    handleWebSocketMessage = (message) => {
        if (message.status === "success" && message.type === "data_response") {
            this.batchData.push(...message.data);
        } else if(message.type !== "data_response") {
            alert("서버 메시지가 올바르지 않습니다.");
        } else {
            alert("에러 발생: " + message.data);
        }
    };

    //block useless rerender
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.orderItems !== this.state.orderItems) {
            return true;
        }
        return false;
    }

    render() {
        const menuListTemplate = (rowData) => {
            return rowData.menuList.map(item => `${item[0]} (x${item[1]})`).join(', ');
        };

        const timeStampTemplate = (rowData) => {
            return new Date(rowData.timeStamp * 1000).toLocaleString();
        };

        const statusTemplate = (rowData) => {
            const statusMap = {
                0: '주문됨',
                1: '접수됨',
                2: '처리 중',
                3: '완료'
            };
            return statusMap[rowData.status] || 'Unknown';
        };

        return (
            <div style={{ margin: '2rem' }}>
                <h2>Dashboard</h2>
                <DataTable 
                    value={this.state.orderItems} 
                    paginator 
                    rows={10} 
                    header="Order List"
                    style={{ marginBottom: '2rem' }}
                >
                    <Column field="id" header="ID" style={{ width: '10%' }} />
                    <Column field="timeStamp" header="Time" body={timeStampTemplate} style={{ width: '20%' }}/>
                    <Column field="menuList" header="Menu" body={menuListTemplate} />
                    <Column field="status" header="Status" body={statusTemplate} style={{ width: '10%' }}/>
                </DataTable>
            </div>
        );
    }
}

export default DataTableContainer;
