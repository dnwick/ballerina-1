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
import React from 'react';
import PropTypes from 'prop-types';
import BreakStatementAST from './../ast/statements/break-statement';
import StatementDecorator from './statement-decorator';

/**
 * Break statement decorator.
 *
 * @class BreakStatement
 * @extends {React.PureComponent}
 */
class BreakStatement extends React.PureComponent {
    /**
     * Render function for the break statement.
     *
     * @returns {ReactElement} The view.
     * @memberof BreakStatement
     */
    render() {
        const model = this.props.model;
        const expression = model.getStatementString();
        return (<StatementDecorator model={model} viewState={model.viewState} expression={expression} />);
    }
}

BreakStatement.propTypes = {
    model: PropTypes.instanceOf(BreakStatementAST).isRequired,
};

export default BreakStatement;
