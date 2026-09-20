"use client";

import {Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { toast } from "react-toastify";

export function EditUserModal({user}) {
    const {id, name, image} = user;
    const editUserInfo = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userInfo = Object.fromEntries(formData.entries())

        const res = await fetch(`http://localhost:5050/useredit/${id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
        if (!res.ok) throw new Error("Update failed");

        const data = await res.json();
        toast.success("Profile updated!");
    }
  return (
    <Modal>
      <Button variant="danger-soft">Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit User Info</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={editUserInfo} className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input defaultValue={user.name}/>
                  </TextField>
                  <TextField className="w-full" name="image" variant="secondary">
                    <Label>Image URL</Label>
                    <Input defaultValue={user.image}/>
                  </TextField>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="danger" slot='close' >Update</Button>
                </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}