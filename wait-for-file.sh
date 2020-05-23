#!/bin/bash
until [ -f "$1" ]
do
      sleep 2
      echo "waiting for kubeconfig file.."
done