## Changelog for histone_chipseq_quality_metric.json

### Minor changes since schema version 2

* *quality_metric_of* was set to have a minimum of 1.
* Added *SPRITE-IP* to *assay_term_name* enum
* Added *CUT&Tag* to *assay_term_name* enum
* Added *Capture Hi-C* and *single-nucleus RNA-seq* to *assay_term_name* enum
* Added *GRO-cap*, *GRO-seq*, and *long read single-cell RNA-seq* to *assay_term_name* enum;  *single-nucleus RNA-seq* and *genotyping by high throughput sequencing assay* were removed and remapped to *single-cell RNA sequencing assay* and *whole genome sequencing assay* respectively
* Removed *single-cell ATAC-seq* from *assay_term_name* enum and remapped to *single-nucleus ATAC-seq*
* Added *LC/MS label-free quantitative proteomics*, *LC-MS/MS isobaric label quantitative proteomics*, and *Ribo-seq* to *assay_term_name* enum. *assay_term_name* enum *Capture Hi-C* was changed to *capture Hi-C*
* Added *genomic perturbation followed by RT-qPCR* to *assay_term_name* enum.
* Added *seqFISH* to *assay_term_name* enum.

### Schema version 2

* *assay_term_name* enum *single-nuclei ATAC-seq* was changed to *single-nucleus ATAC-seq*

### Minor changes since schema version 1

* *nreads*, *nreads_in_peaks*, *npeak_overlap* were set to have a minimum of 0.

### Schema version 1

* New schema for *histone_chipseq_quality_metric* added