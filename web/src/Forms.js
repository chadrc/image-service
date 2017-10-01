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
            this.props.onSubmit(this.props.actionType, new FormData(this.form));
            if (this.clearOnSubmit) {
                this.form.reset();
            }

            if (this.props.actionSuccess) {
                this.props.actionSuccess();
            }
        }
    }

    render() {
        return (
            <form {...this.props}
                  onSubmit={(event) => this.submit(event)}
                  ref={(form) => this.formRef(form)}>
                {this.props.children}
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (type, data) => {
            dispatch({
                type: type,
                data: data
            });
        }
    };
};

const FormContainerConnect = connect(null, mapDispatchToProps)(FormContainer);

export default FormContainerConnect