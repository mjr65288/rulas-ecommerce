"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function deleteNetworkDetails(props: any) {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
    props.closeDeleteModal();
  };
  const deleteNetwork = () => {
    props.deleteNetwork();
    closeModal();
  };
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={closeModal} />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteNetwork}
      />
    </React.Fragment>
  );
  return (
    <div>
      <Dialog
        visible={visible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        position="center"
        footer={deleteProductsDialogFooter}
        onHide={closeModal}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {props.data.length !== 1 ? (
            <span>Are you sure to delete the selected network elements?</span>
          ) : (
            <span>
              Are you sure to delete the network element{" "}
              <b>{props.data[0].common_name}</b>
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
