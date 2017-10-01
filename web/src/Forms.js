import React from 'react';
import {connect} from 'react-redux';

class FormContainer extends React.Component {

    formRef(form) {
        this.form = form;
    }

    get clearOnSubmit() {
        return this.props.clearOnSubmit !== false;
    }

    submit(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(
                this.props.actionType,
                new FormData(this.form),
                this.props.actionSuccess,
                this.props.actionFailure
            );
        }
    }

    render() {
        let props = Object.assign({}, this.props);
        delete props.actionSuccess;
        delete props.actionFailure;
        delete props.actionType;
        return (
            <form {...props}
                  onSubmit={(event) => this.submit(event)}
                  ref={(form) => this.formRef(form)}>
                {this.props.children}
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (type, data, success, failure) => {
            dispatch({
                type: type,
                data: data,
                success: success,
                failure: failure
            });
        }
    };
};

const FormContainerConnect = connect(null, mapDispatchToProps)(FormContainer);

export default FormContainerConnect