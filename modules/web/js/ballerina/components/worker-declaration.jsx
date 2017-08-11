/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import _ from 'lodash';
import React from 'react';
import LifeLine from './lifeline.jsx';
import { getComponentForNodeArray } from './utils';
import StatementContainer from './statement-container';
import * as DesignerDefaults from './../configs/designer-defaults';
import { util } from './../visitors/sizing-utils';
import ImageUtil from './image-util';

class WorkerDeclaration extends React.Component {

    constructor(props) {
        super(props);

        this.editorOptions = {
            propertyType: 'text',
            key: 'WorkerDeclaration',
            model: props.model,
            getterMethod: props.model.getWorkerDeclarationStatement,
            setterMethod: props.model.setWorkerDeclarationStatement,
        };
    }

    onDelete() {
        this.props.model.remove();
    }

    render() {
        const statementContainerBBox = this.props.model.viewState.components.statementContainer;
        const statementContainerBBoxClone = Object.assign({}, this.props.model.getViewState().
            components.statementContainer);
        const connectorOffset = this.props.model.getViewState().components.statementContainer.expansionW;

        statementContainerBBoxClone.w += connectorOffset;
        const workerScopeContainerBBox = this.props.model.viewState.components.workerScopeContainer;
        const workerBBox = {};
        const children = getComponentForNodeArray(this.props.model.getChildren());
        const nodeFactory = this.props.model.getFactory();
        workerBBox.x = statementContainerBBox.x + (statementContainerBBox.w - DesignerDefaults.lifeLine.width) / 2;
        workerBBox.y = statementContainerBBox.y - DesignerDefaults.lifeLine.head.height;
        workerBBox.w = DesignerDefaults.lifeLine.width;
        workerBBox.h = statementContainerBBox.h + DesignerDefaults.lifeLine.head.height * 2;

        // Check for connector declaration children
        const connectorChildren = _.filter(this.props.model.getChildren(),
            child => nodeFactory.isConnectorDeclaration(child));
        let workerScopeContainerVisibility = 'hidden';
        // If more than one worker is present, then draw the worker scope container boundary around the workers
        if ((_.filter(this.props.model.getChildren(), child => nodeFactory.isWorkerDeclaration(child)).length) >= 0) {
            workerScopeContainerVisibility = 'visible';
        }
        const classes = {
            lineClass: 'worker-life-line',
            polygonClass: 'worker-life-line-polygon',
        };

        return (<g>
            <StatementContainer dropTarget={this.props.model} bBox={statementContainerBBoxClone} />
            <LifeLine
                title={util.getTextWidth(this.props.model.getWorkerName(), 0,
                    DesignerDefaults.lifeLine.width - 30).text}
                bBox={workerBBox}
                editorOptions={this.editorOptions}
                model={this.props.model}
                onDelete={this.onDelete.bind(this)}
                classes={classes}
                tooltip={this.props.model.getWorkerName()}
                icon={ImageUtil.getSVGIconString('tool-icons/worker-white')}
                iconColor='#0380c6'
            />
            { connectorChildren.length > 0 &&
            <g style={{ visibility: workerScopeContainerVisibility }}>
                <rect
                    x={workerScopeContainerBBox.x}
                    y={workerScopeContainerBBox.y}
                    width={workerScopeContainerBBox.w + workerScopeContainerBBox.expansionW}
                    height={workerScopeContainerBBox.h}
                    style={{ fill: 'none',
                        stroke: '#67696d',
                        strokeWidth: 2,
                        strokeLinecap: 'round',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 4,
                        strokeOpacity: 1,
                        strokeDasharray: 5 }}
                /> </g>}
            {children}
        </g>
        );
    }
}

export default WorkerDeclaration;
